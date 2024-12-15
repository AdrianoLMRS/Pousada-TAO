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
    const fs = require('fs');
    const logsPath = './logSetup.js'; // path for logs
    if (fs.existsSync(logsPath)) {
        require(logsPath) // For logs (optional)
    } else {
        console.log('File logSetup.js not found.  Ignoring...');
    }

// *GLOBAL MIDDLEWARES
    // app.use(express.json()); // JSON GLOBAL MIDDLEWARE
    // CORS GLOBAL MIDDLEWARE
    const allowedOrigins = ['https://pousada-tao.onrender.com', 'http://localhost:3000']; // Allowed CORS origins
    app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) { // Permit valid origins (e.g., Postman, insomnia)
        callback(null, true);
        } else {
        callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
    }));
    app.use(cookieParser()); // COOKIES GLOBAL MIDDLEWARE
    app.use(express.static(path.join(__dirname, '..', 'public'))); // SET PUBLIC FOLDER STATIC
    app.use((req, res, next) => { // logs
        console.log(`\n\nNova request: \n
        REQ METHOD : ${req.method} \n
        REQ URL : ${req.url} \n
        REQ/USER IP : ${req.ip} \n\n`);

    next(); 
  }); 
  app.set('view engine', 'ejs'); // For redenring .ejs files
  app.set('views', path.join(__dirname, 'views')); // Templates folder

  
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
        console.log(`\nApi up and running at: http://localhost:${port}\n`);
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

// Initialize server + log
start(process.env.PORT);