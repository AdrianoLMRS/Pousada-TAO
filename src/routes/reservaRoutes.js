// *Dependecies
    const path = require('path'); // Path for folders
    require('dotenv').config({ path: path.join(__dirname, '../.env') }); // Loads .env
    const express = require('express');
    const { createCheckoutSession } = require('../controllers/reservaController');
    const router = express.Router();

// *Routes
    // Get Reserva.html (static)
    router.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../../public/reserva.html')); // Send Profile static HTML
      });

    // Checkout Stripe route
    router.post('/checkout', createCheckoutSession);

module.exports = router;