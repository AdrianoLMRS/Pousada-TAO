const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const stripe = require('stripe')('sk_test_51QL7dYH40HYEkt7K9fBYteAL6hrmbVARzmAXXVwS2an9LV4e5DqKLKPWRnc3mNmPgIUuHl0jwVncsKjq5AdrNR3j0081JWuMcr');

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
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
                        unit_amount: 5000, // Valor em centavos, ex: R$50,00
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

