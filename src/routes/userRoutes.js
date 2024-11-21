const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const profileController = require('../controllers/profileController');

const router = express.Router();

// Rota para exibir o perfil do usuário
router.get('/profile', requiresAuth(), profileController.getProfile);

module.exports = router;
