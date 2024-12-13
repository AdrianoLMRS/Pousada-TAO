// *Dependecies
    const path = require('path');
    require('dotenv').config({ path: path.join(__dirname, '../.env') }); // Loads .env
    const express = require('express');
    const User = require('../db/models/userModel'); // User model
    const Reservation = require('../db/models/reservaModel'); // reservaModel
    const Cache = require('../db/models/cacheModel'); // Imports Cache model
    const auth = require('../middlewares/authMiddleware') // Authentication middleware with JWT 
    const jwt = require('jsonwebtoken'); // For /login JWT
    const router = express.Router();

    const JWT_SECRET = process.env.JWT_SECRET;

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

// Rota para retornar os dados do perfil
router.post('/dataHash', async (req, res) => {
    const { customerIdHash } = req.body; // Capturar o hash de consulta
    console.log('Hash recebido:', customerIdHash); // Log para depuração

    try {
        // Buscar o documento do usuário na coleção Cache
        const cacheEntry = await Cache.findOne({ hash: customerIdHash });
        if (!cacheEntry) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        const { customerId } = cacheEntry; // Obter o customerId correspondente
        console.log('customerId encontrado:', customerId); // Log para depuração

        // Buscar o usuário na coleção users
        const user = await User.findOne({ customerId });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado na coleção users.' });
        }

        // Gerar o JWT
        const token = jwt.sign({ id: user._id, customerId: user.customerId }, JWT_SECRET, { expiresIn: '1h' });

        // Definir o cookie com o JWT
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Garantir que o cookie seja seguro em produção
            maxAge: 3600000, // 1 hora em milissegundos
        });

        // Retornar resposta de sucesso
        res.status(200).json({ message: 'Login bem-sucedido!' });

    } catch (error) {
        console.error('Erro ao buscar dados do perfil:', error.message);
        res.status(500).json({ message: 'Erro ao buscar os dados do perfil.' });
    }
});


router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/login.html')); // Send Login static HTML
});

module.exports = router;
