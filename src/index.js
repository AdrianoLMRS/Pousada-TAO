const express = require('express');
const cors = require('cors'); // Enable CORS
const path = require('path');
const stripe = require('./routes/stripe'); // Import Stripe Check routes
const apiRoutes = require('./routes/apiRoutes');  // Com a extensão .js já implícita
const app = express();
const reservationCache = {}; // Cache em memória
require('dotenv').config();

app.use(express.json());

app.use(cors({
  origin: process.env.BASE_URL, // Frontend + Backend port 5000
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // cookies/credentials
}));

app.use(express.static(path.join(__dirname, '..', 'public')));

// Route for finding (Reloads frontend)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Conect Database MongoDB
const connectDB = require('./db');
connectDB();


const router = express.Router();

router.get('/reservation-data/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const cachedData = reservationCache[sessionId];
  if (cachedData) {
      res.json(cachedData);
  } else {
      res.status(404).json({ error: 'Dados não encontrados no cache.' });
  }
});

// FOR DEBUG :
router.get('/debug', (req, res) => {
  res.json(reservationCache);
});

app.use(router)


// API routes backend
router.use(apiRoutes); 
router.use(stripe); // routes/stripe.js

// Initialize server
app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando em ${process.env.BASE_URL}`);
});
