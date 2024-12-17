// *Dependecies
    const path = require('path'); // Path for folders
    require('dotenv').config({ path: path.join(__dirname, '../.env') }); // Loads .env
    const express = require('express');
    const jwt = require('jsonwebtoken');
    const router = express.Router();

const Cache = require('../db/models/cacheModel'); // Cache model


const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = '72h'
const COOKIE_EXPIRATION = 3 * 24 * 60 * 60 * 1000 // 3 days in milliseconds


// Validate cs STRIPE
async function validateCs(cs) {
    if (!cs) {
        throw new Error('Session ID (cs) is required.');
    }

    // Find cs in cache
    const cacheEntry = await Cache.findOne({ sessionId: cs });

    if (!cacheEntry) {
        throw new Error('Session ID not found in cache.');
    }

    return cacheEntry;
}

// API route to set a cookie with JWT
router.get('/set-cookies', async (req, res) => {
    const { cs } = req.query; // Pega o parâmetro cs da query string

    try {
        // returns cache
        const cacheEntry = await validateCs(cs);

        // Extract customerId of document find
        const { customerId } = cacheEntry;

        // Create payload
        const payload = { customerId };

        // JWT
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

        // Define the cookie with the JWT
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: COOKIE_EXPIRATION,
        });

        res.redirect('/profile'); // Redirects user to /profile after cookie
    } catch (error) {
        console.error('Error setting cookie:', error.message);
        // Customize the response based on the error
        if (error.message === 'Session ID not found in cache.') {
            return res.status(404).json({ message: 'Session ID not found.' }); // Specific error for cache miss
        }
        // Default error message for other issues
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = router;

