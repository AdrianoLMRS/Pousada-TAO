// *Dependecies
const path = require('path'); // Path for folders
require('dotenv').config({ path: path.join(__dirname, '../.env') }); // Loads .env
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Inicializa Stripe
const jwt = require('jsonwebtoken');
const router = express.Router();

// Modelo do cache
const { Cache } = require('../utils/dbUtils'); // Certifique-se de ter o modelo Cache configurado


const JWT_SECRET = process.env.JWT_SECRET;

// API route to set a cookie with JWT
router.get('/set-cookies', async (req, res) => {
    const { cs } = req.query; // Pega o parâmetro cs da query string

    if (!cs) {
        return res.status(400).json({ message: 'Session ID (cs) is required.' });
    }

    try {
        // Buscar na coleção cache onde o sessionId é igual ao cs
        const cacheEntry = await Cache.findOne({ sessionId: cs });

        if (!cacheEntry) {
            return res.status(404).json({ message: 'Session ID not found in cache.' });
        }

        // Extrair o customerId do documento encontrado
        const { customerId } = cacheEntry;

        // Criar o payload do JWT com o customerId
        const payload = { customerId };

        // Gerar o JWT
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        // Definir o cookie com o JWT
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000, // 1 hora
        });

        // Resposta ao cliente
        res.status(200).json({ message: 'Cookie set with JWT', customerId });
    } catch (error) {
        console.error('Error setting cookie:', error.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = router;

