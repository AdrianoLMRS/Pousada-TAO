require('dotenv').config({ path: '../.env' });
const { requiresAuth } = require('express-openid-connect');

// *MongoDB
  const { MongoClient, ServerApiVersion } = require('mongodb');
  const mongoose = require('mongoose');
  const URI = process.env.MONGO_URI
  const User = require('./models/db_model'); // Import user model Auth0

// *Express
  const express = require('express');
  const routerDB = express.Router();


mongoose.connect(URI, {
  useNewUrlParser: true
})

const db = mongoose.connection;


routerDB.get('/profile', requiresAuth(), async (req, res) => {
  try {
    // A informação do usuário vem da propriedade `req.oidc.user`
    const { sub, name, email, picture } = req.oidc.user;

    // Verifica se o usuário já existe no banco de dados
    let user = await User.findOne({ auth0Id: sub });

    if (!user) {
      // Se o usuário não existe, cria um novo
      user = new User({
        auth0Id: sub,
        name,
        email,
        picture,
      });
      await user.save(); // Salva o usuário no MongoDB
      console.log('Usuário salvo no banco de dados');
    }

    res.json(req.oidc.user); // Retorna os dados do usuário
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
    res.status(500).send('Erro ao salvar usuário no banco de dados');
  }
});


module.exports = { db, routerDB }; // Exporta a função connectDB e o mongoose