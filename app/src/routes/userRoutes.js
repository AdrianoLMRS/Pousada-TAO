// *Dependecies
    const path = require('path');
    require('dotenv').config({ path: path.join(__dirname, '../.env') }); // Loads .env
    const express = require('express');
    const User = require('../db/models/User'); // User model
    const Reservation = require('../db/models/reservaModel'); // reservaModel
    const auth = require('../middlewares/authMiddleware') // Authentication middleware with JWT 
    const router = express.Router();

// Rota para renderizar a página de perfil
router.get('/', auth, async (req, res) => {
    const { customerId } = req;

    try {
        // Buscar o documento do usuário na coleção users
        const user = await User.findOne({ customerId });
        if (!user) {
            return res.status(404).send('Usuário não encontrado.');
        }

        // Buscar as reservas na coleção reservations
        const reservations = await Reservation.find({ customerId });

        // Renderizar a página profile.ejs com os dados do usuário e reservas
        res.render('profile', {
            user,
            reservations,
        });
    } catch (error) {
        console.error('Erro ao buscar dados do perfil:', error.message);
        res.status(500).send('Erro ao carregar a página de perfil.');
    }
});

// Rota para retornar os dados do perfil
router.get('/data', auth, async (req, res) => {
    const { customerId } = req;

    try {
        // Buscar o documento do usuário na coleção users
        const user = await User.findOne({ customerId });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        // Buscar as reservas na coleção reservations
        const reservations = await Reservation.find({ customerId });

        // Retornar os dados em formato JSON
        res.status(200).json({
            user,
            reservations,
        });
    } catch (error) {
        console.error('Erro ao buscar dados do perfil:', error.message);
        res.status(500).json({ message: 'Erro ao buscar os dados do perfil.' });
    }
});

module.exports = router;
