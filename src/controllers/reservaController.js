// *Dependecies
    // const path = require('path');
    // require('dotenv').config({ path: path.join(__dirname, '../.env') });
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const {    calculateTotalPrice, validateDates, createStripeSession,    } = require('../utils/reservaUtils')


// Controller function to handle creating a checkout session
const createCheckoutSession = async (req, res) => {
    const { checkinDate, checkoutDate, adults, children } = req.body;

    if (!checkinDate || !checkoutDate || !adults || !children) {
        return res.status(400).json({ error: 'Faltam dados obrigatórios.' });
    }

    try {
        // Validate and calculate
        const { checkin, checkout, days } = validateDates(checkinDate, checkoutDate);
        const totalPrice = calculateTotalPrice(days, adults, children);

        // Create Stripe session
        const session = await createStripeSession(totalPrice, checkin, checkout, adults, children);

        res.status(200).json({ sessionId: session.id });
    } catch (error) {
        console.error('Error creating Stripe session:', error.message);
        res.status(500).json({ error: 'Falha ao criar a sessão de checkout.' });
    }
};

module.exports = {
    createCheckoutSession,
};
