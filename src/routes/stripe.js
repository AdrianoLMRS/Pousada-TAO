const express = require('express');
require('dotenv').config(); // Require .env
console.log(process.env.PORT)
console.log(process.env.BASE_URL)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const router = express.Router();


// Rota de criação da sessão de checkout
router.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'brl',
                        product_data: {
                            name: 'Produto de Teste',
                        },
                        unit_amount: 50000, // Centavos
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.BASE_URL}/success.html`, // TODO: Create and style
            cancel_url: `${process.env.BASE_URL}/cancel.html`, // TODO: Create and style
        });
        
        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;