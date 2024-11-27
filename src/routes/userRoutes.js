const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') }); // Loads .env
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../db/models/User'); // Modelo da coleção users
const Reservation = require('../db/models/reservaModel'); // Modelo da coleção reservations
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware para autenticar e extrair o customerId do token
const authenticateUser = (req, res, next) => {
    const token = req.cookies.authToken; // Pega o authToken do cookie

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token não encontrado.' });
    }

    try {
        // Verificar e decodificar o token JWT
        const decoded = jwt.verify(token, JWT_SECRET);
        req.customerId = decoded.customerId; // Adiciona o customerId ao objeto req
        next();
    } catch (error) {
        console.error('Erro ao autenticar o token:', error.message);
        return res.status(403).json({ message: 'Token inválido ou expirado.' });
    }
};

// Rota para renderizar a página de perfil
router.get('/', authenticateUser, async (req, res) => {
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
router.get('/data', authenticateUser, async (req, res) => {
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
