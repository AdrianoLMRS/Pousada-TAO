const express = require('express');
require('dotenv').config(); // Require .env
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
                        unit_amount: 5000, 
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/success.html',
            cancel_url: 'http://localhost:3000/cancel.html',
        });
        
        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; // Exporta as rotas para o index.js