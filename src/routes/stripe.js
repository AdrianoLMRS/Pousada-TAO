const express = require('express');
const router = express.Router();
const path = require('path');
const { requiresAuth } = require('express-openid-connect');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

require('dotenv').config({ path: path.join(__dirname, '../.env') }); // Loads .env

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('A variável STRIPE_SECRET_KEY não está definida no arquivo .env');
}

// Checkout Stripe route
router.post('/create-checkout-session', requiresAuth(), async (req, res) => {
    console.log('Dados recebidos no Stripe:', req.body);
    const { checkinDate, checkoutDate, adults, children } = req.body;

    // Validação dos dados recebidos
    if (!checkinDate || !checkoutDate || !adults || !children) {
        return res.status(400).json({ error: 'Faltam dados obrigatórios' });
    }

    const checkin = new Date(checkinDate);
    const checkout = new Date(checkoutDate);

    if (isNaN(checkin) || isNaN(checkout) || checkout <= checkin) {
        return res.status(400).json({ error: 'Datas de check-in e check-out inválidas' });
    }

    try {
        // Cálculo do preço total
        const days = (checkout - checkin) / (1000 * 3600 * 24);
        const pricePerAdult = 10000; // R$ 100,00 (centavos)
        const pricePerChild = 5000;  // R$ 50,00 (centavos)
        const totalPrice = (adults * pricePerAdult + children * pricePerChild) * days;

        // Criar uma sessão no Stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'brl',
                        product_data: {
                            name: `Reserva para ${adults} adultos e ${children} crianças`,
                        },
                        unit_amount: totalPrice, // em centavos
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.BASE_URL}/success.html`,
            cancel_url: `${process.env.BASE_URL}/cancel.html`,
        });

        // Retornar o URL da sessão criada
        res.status(200).json({ sessionId: session.id });
    } catch (error) {
        console.error('Erro ao criar sessão no Stripe:', error);
        res.status(500).json({ error: 'Falha ao criar a sessão de checkout' });
    }
});

module.exports = router;