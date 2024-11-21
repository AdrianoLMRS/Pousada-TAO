const express = require('express');
const cors = require('cors'); // Enable CORS
const path = require('path');
require('dotenv').config();

// *ROUTES
  const stripe = require('./routes/stripe'); // Import Stripe Check routes
  const userRoutes = require('./routes/userRoutes'); // userRoutes

// *MIDDLEWARES
  const saveUser = require('./middlewares/saveUser');

const app = express();
const router = express.Router();


// *Auth0   
const { auth, requiresAuth } = require('express-openid-connect');
  const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET_HASH,
    baseURL: process.env.BASE_URL,
    clientID: 'r5sNxjj44fHqDYlWY7JM5hjLVojvLPJz',
    issuerBaseURL: 'https://adrianoo.us.auth0.com'
  };


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
// app.get('/profile', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });

console.log(config);

app.use(express.static(path.join(__dirname, '..', 'public')));

// *Configurar o motor de template EJS
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));

// Route for finding (Reloads frontend)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
// });

// *Conect Database MongoDB
  const { connectDB, routerDB } = require('./db/index'); // index.js in Database folder
  
  connectDB()
  app.use('/db', routerDB);

app.use(router);

// *Routes uses
  router.use('/stripe', stripe); // routes/stripe.js
  app.use(userRoutes); //routes/userRoutes.js

// *Middleware uses
  app.use(saveUser);    // Aplica o middleware após o Auth0

// Initialize server log
app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando em ${process.env.BASE_URL}`);
});


// module.exports = app;