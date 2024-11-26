const express = require('express');
const { handleStripeWebhook } = require('../controllers/webhookController');

const router = express.Router();

// Middleware para capturar eventos brutos do Stripe
router.post(
    '/', // A URL correta
    express.raw({ type: 'application/json' }), // Captura o raw body necessário para validação
    handleStripeWebhook
);

module.exports = router;