const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Reservation = require('../db/models/reservaModel');

const handleStripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body, // O raw body do Stripe (não processado)
            sig,
            process.env.STRIPE_WEBHOOK_SECRET // A chave do webhook configurada no Stripe
        );
    } catch (err) {
        console.error('Erro ao validar webhook:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        try {
            const reservation = new Reservation({
                checkIn: session.metadata.checkIn,
                checkOut: session.metadata.checkOut,
                adults: parseInt(session.metadata.adultos, 10),
                children: parseInt(session.metadata.criancas, 10),
                totalAmount: session.amount_total / 100, // Valor em reais
                stripeSessionId: session.id,
                paymentStatus: session.payment_status,
            });

            await reservation.save();

            console.log('Reserva salva com sucesso:', reservation);
        } catch (err) {
            console.error('Erro ao salvar reserva no MongoDB:', err);
        }
    }

    res.status(200).json({ received: true });
};

module.exports = { handleStripeWebhook };