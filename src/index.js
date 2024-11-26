// *DEPENDECIES
  const path = require('path'); // Path for folders
  require('dotenv').config(); // Loads enviroments variables first
  const express = require('express');
  const app = express(); // Aplication
  const cors = require('cors'); // Enable CORS
  const { connectDB } = require('./db/index'); // Conect Database MongoDB
  const cookieParser = require('cookie-parser');

// *ROUTES
const stripeRoutes = require('./routes/reservaRoutes'); // Import Stripe Check routes
const stripeWebhook = require('./routes/stripeWebhook'); // Import Stripe Webhook
  const authRoutes = require('./routes/authRoutes'); //  Import Authentication routes
  const userRoutes = require('./routes/userRoutes'); // Import User Routes

// *CONSTANTS
  // none for now

// *GLOBAL MIDDLEWARES
  app.use(express.json()); // JSON GLOBAL MIDDLEWARE
  app.use(cors()); // CORS GLOBAL MIDDLEWARE
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '..', 'public'))); // SET PUBLIC FOLDER STATIC
  app.use((req, res, next) => { // logs
    console.log(`\n\nNova request: \nREQ METHOD : ${req.method} \nREQ URL : ${req.url} \nREQ/USER IP : ${req.ip} \n\n`);
    next(); 
  }); 
  
// *FUNCTIONS
  connectDB();

// *Routes uses
  app.use('/reserva', stripeRoutes); // routes/stripe.js
  app.use('/auth', authRoutes); // routes/auth.js
  app.use('/profile', userRoutes); //routes/userRoutes.js
  app.use('/webhooks', stripeWebhook); //routes/userRoutes.js


// Initialize server log
app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando em ${process.env.BASE_URL}`);
});