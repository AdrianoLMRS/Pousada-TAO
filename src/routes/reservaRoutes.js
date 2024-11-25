// *Dependecies
    const path = require('path');
    require('dotenv').config({ path: path.join(__dirname, '../.env') }); // Loads .env
    const express = require('express');
    const { createCheckoutSession } = require('../controllers/reservaController');
    const { authMiddleware } = require('../middlewares/authMiddleware');
    const router = express.Router();

// *Routes
    // Get Reserva.html (static)
    router.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../../public/reserva.html')); // Send Profile static HTML
      });

    // Checkout Stripe route
    router.post('/checkout', authMiddleware, createCheckoutSession);

module.exports = router;