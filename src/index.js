// *DEPENDECIES
  const path = require('path'); // Path for folders
  require('dotenv').config(); // Loads enviroments variables first
  const express = require('express');
  const app = express(); // Aplication
  const cors = require('cors'); // Enable CORS
  const { connectDB } = require('./db/index'); // Conect Database MongoDB
  const cookieParser = require('cookie-parser');

// *ROUTES
  const reservaRoutes = require('./routes/reservaRoutes'); // Import Stripe Check routes
  const webhookRoutes = require('./routes/webhookRoutes'); // Import Stripe Webhook
  const userRoutes = require('./routes/userRoutes'); // Import User Routes

// *CONSTANTS
  // none for now

// *GLOBAL MIDDLEWARES
  // app.use(express.json()); // JSON GLOBAL MIDDLEWARE
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
  app.use('/reserva', express.json(), reservaRoutes); // routes/stripe.js
  app.use('/profile', express.json(), userRoutes); //routes/userRoutes.js
  app.use('/webhooks', express.raw({ type: 'application/json' }), webhookRoutes); // Use express.raw for webhook



const start = (port) => {
  try {
    app.listen(port, () => {
      console.log(`Api up and running at: http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// Initialize server + log
start(process.env.PORT);