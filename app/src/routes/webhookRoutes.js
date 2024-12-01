const express = require('express');
const { handleStripeWebhook } = require('../controllers/webhookController');

const router = express.Router();

// Stripe middleware
router.post(
    '/', 
    express.raw({ type: 'application/json' }), // Raw body json
    handleStripeWebhook
);

module.exports = router;