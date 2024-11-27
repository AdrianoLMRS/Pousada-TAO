const path = require('path'); // Path for folders
require('dotenv').config({ path: path.join(__dirname, '../.env') }); // Loads .env
const JWT_SECRET = process.env.JWT_SECRET;
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const jwt = require('jsonwebtoken');
const User = require('../db/models/User');

// Middleware para autenticar o usuário com o JWT e obter o `cs`
const authorization = async (req, res, next) => {
    const token = req.cookies.authToken; // Pega o authToken do cookie

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token não encontrado.' });
    }

    try {
        // Verificar e decodificar o token JWT
        const decoded = jwt.verify(token, JWT_SECRET);
        const cs = decoded.cs; // Obtem o `cs` do payload do JWT

        if (!cs) {
            return res.status(400).json({ message: 'Checkout session ID (cs) não encontrado no token.' });
        }

        // Usar o Stripe para obter os detalhes da sessão de checkout
        const session = await stripe.checkout.sessions.retrieve(cs);

        if (!session) {
            return res.status(404).json({ message: 'Sessão de checkout não encontrada.' });
        }

        // Adicionar o customerId ao request
        req.customerId = session.customer;
        next();
    } catch (error) {
        console.error('Erro ao autenticar o token ou recuperar sessão:', error.message);
        return res.status(403).json({ message: 'Token inválido ou sessão inválida.' });
    }
};

module.exports = { authorization };
