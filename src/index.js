const express = require('express');
const cors = require('cors'); // Enable CORS
const path = require('path');
const stripeRoutes = require('./routes/stripe'); // Import Stripe routes
const apiRoutes = require('./routes/apiRoutes');  // Com a extensão .js já implícita
const app = express();
require('dotenv').config();

app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'public')));

// Route for finding (Reloads frontend)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});


// Conect Database MongoDB
const connectDB = require('./db');
connectDB();

app.use(cors({
  origin: process.env.BASE_URL, // Frontend port 3000
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // cookies/credentials
}));

// API routes backend
app.use('/api', apiRoutes);

app.use(stripeRoutes); // stripe.js file

// Initialize server
app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando em ${process.env.BASE_URL}`);
});
