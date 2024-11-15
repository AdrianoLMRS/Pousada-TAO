const express = require('express');
const path = require('path');
const stripeRoutes = require('./src/stripe'); // Importa as rotas relacionadas ao Stripe

const app = express();
const PORT = 3000;

require('dotenv').config();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Utiliza as rotas do arquivo stripe.js
app.use(stripeRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://0.0.0.0:${PORT}`);
});
