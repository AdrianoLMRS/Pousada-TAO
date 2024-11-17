const express = require('express');
require('dotenv').config(); // Carregar variáveis de ambiente
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Reservation = require('../db/models/db_model'); // Modelo de reserva

const router = express.Router();
const reservationCache = {}; // Cache para dados de reserva temporários

// Rota de criação da sessão de checkout
router.post('/create-checkout-session', async (req, res) => {
    const { checkinDate, checkoutDate, adults, children, sessionId } = req.body;
    reservationCache[sessionId] = { checkinDate, checkoutDate, adults, children };

    // Validação dos dados recebidos
    if (!checkinDate || !checkoutDate || !adults || !children) {
        return res.status(400).json({ error: 'Faltam dados obrigatórios' });
    }

    try {
        // Calcula o número de dias da estadia
        const checkin = new Date(checkinDate);
        const checkout = new Date(checkoutDate);
        const days = (checkout - checkin) / (1000 * 3600 * 24);

        // Defina o valor por adulto e por criança
        const pricePerAdult = 10000; // R$ 100,00 por adulto (em centavos)
        const pricePerChild = 5000;  // R$ 50,00 por criança (em centavos)

        // Calcula o preço total com base nos dias de estadia, adultos e crianças
        const totalPrice = (adults * pricePerAdult + children * pricePerChild) * days;

        // Cria a sessão de checkout do Stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'brl',
                        product_data: {
                            name: `Reserva Hostel para ${adults} adultos e ${children} crianças`,
                        },
                        unit_amount: totalPrice, // Preço total em centavos
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.BASE_URL}/success.html`,  // URL de sucesso
            cancel_url: `${process.env.BASE_URL}/cancel.html`,    // URL de cancelamento
        });

        // Retorna o ID da sessão para o frontend
        res.json({ id: session.id });
    } catch (error) {
        console.error('Erro ao criar a sessão do Stripe:', error);
        res.status(500).json({ error: error.message });
    }
});

// Rota para verificar o pagamento
router.post('/verify-payment', async (req, res) => {
    const { sessionId } = req.body;

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (session.payment_status === 'paid') {
            const reservationData = reservationCache[sessionId];
            if (reservationData) {
                const reservation = new Reservation({
                    checkinDate: reservationData.checkinDate,
                    checkoutDate: reservationData.checkoutDate,
                    adults: reservationData.adults,
                    children: reservationData.children,
                    sessionId: sessionId,
                    paymentStatus: 'paid',
                    totalPrice: session.amount_total,
                });
                await reservation.save();
                delete reservationCache[sessionId];
                res.json({ success: true });
            } else {
                res.status(404).json({ error: 'Dados da reserva não encontrados no cache.' });
            }
        } else {
            res.status(400).json({ error: 'Pagamento não confirmado.' });
        }
    } catch (error) {
        console.error('Erro ao verificar pagamento:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
