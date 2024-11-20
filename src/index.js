const express = require('express');
const cors = require('cors'); // Enable CORS
const path = require('path');
require('dotenv').config();

// STRIPE
  const stripe = require('./routes/stripe'); // Import Stripe Check routes

// 0Auth  
const { auth, requiresAuth } = require('express-openid-connect');
  const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET_HASH,
    baseURL: process.env.BASE_URL,
    clientID: 'r5sNxjj44fHqDYlWY7JM5hjLVojvLPJz',
    issuerBaseURL: 'https://adrianoo.us.auth0.com'
  };

const app = express();
const router = express.Router();

const reservationCache = {}; // Cache em memória


app.use(express.json());

app.use(cors({
  origin: process.env.BASE_URL, // Frontend + Backend port 5000
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // cookies/credentials
}));

// *0Auth
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// Returns profile JSON
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

console.log(config);

app.use(express.static(path.join(__dirname, '..', 'public')));

// Route for finding (Reloads frontend)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
// });

// *Conect Database MongoDB
  const { db, routerDB } = require('./db/index'); // index.js in Database folder
  db.on('error:', (error) => console.log(error))
  db.once('open:', () => console.log('Connected to database!!!'))

  app.use(routerDB);


router.get('/reservation-data/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const cachedData = reservationCache[sessionId];
  if (cachedData) {
      res.json(cachedData);
  } else {
      res.status(404).json({ error: 'Dados não encontrados no cache.' });
  }
});

app.use(router);

// API routes backend
  router.use(stripe); // routes/stripe.js

// Initialize server
app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando em ${process.env.BASE_URL}`);
});


// module.exports = app;