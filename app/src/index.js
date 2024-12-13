// *DEPENDECIES
    const path = require('path'); // Path for folders
    require('dotenv').config(); // Loads enviroments variables first
    const express = require('express');
    const app = express(); // Aplication
    const cors = require('cors'); // Enable CORS
    const { connectDB } = require('./db/index'); // Conect Database MongoDB
    const cookieParser = require('cookie-parser');

// *ROUTES
    const apiRoutes = require('./routes/apiRoutes'); // Import Stripe Check routes
    const reservaRoutes = require('./routes/reservaRoutes'); // Import Stripe Check routes
    const webhookRoutes = require('./routes/webhookRoutes'); // Import Stripe Webhook
    const userRoutes = require('./routes/userRoutes'); // Import User Routes

// *CONSTANTS
    require('./email') // For sending E-MAILS with nodemailer
    require('./logSetup') // For logs (optional)

// *GLOBAL MIDDLEWARES
    // app.use(express.json()); // JSON GLOBAL MIDDLEWARE
    app.use(cors()); // CORS GLOBAL MIDDLEWARE
    app.use(cookieParser()); // COOKIES GLOBAL MIDDLEWARE
    app.use(express.static(path.join(__dirname, '..', 'public'))); // SET PUBLIC FOLDER STATIC
    app.use((req, res, next) => { // logs
        console.log(`\n\nNova request: \n
        REQ METHOD : ${req.method} \n
        REQ URL : ${req.url} \n
        REQ/USER IP : ${req.ip} \n\n`);

    next(); 
  }); 
  app.set('view engine', 'ejs'); // Define o EJS como motor de templates
  app.set('views', path.join(__dirname, 'views')); // Pasta onde os templates serão armazenados

  
// *FUNCTIONS
    connectDB();

// *Routes uses
    app.use('/api', express.json(), apiRoutes); // routes/stripe.js
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