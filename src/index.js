const express = require('express');
const cors = require('cors'); // Enable CORS
const path = require('path');
const stripe = require('./routes/stripe'); // Import Stripe Check routes
const apiRoutes = require('./routes/0auth');  // Import apiRoutes
const { auth } = require('express-openid-connect');
const config = require('./routes/0auth'); // Import 0auth config
const app = express();
const router = express.Router();
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
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
// });

// Conect Database MongoDB
const { connectDB } = require('./db'); // Models
connectDB().catch(console.dir);

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
router.get('/debug-cache', async (req, res) => {
  const cacheData = await Cache.find({});
  res.json(cacheData);
});

app.use(router)

// API routes backend
// router.use(apiRoutes); 
// router.use(stripe); // routes/stripe.js

// Initialize server
app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando em ${process.env.BASE_URL}`);
});

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});


console.log(config)
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// module.exports = app;