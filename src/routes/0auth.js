// const { auth } = require('express-openid-connect');
// const app = require('../index.js'); // Import Stripe Check routes
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') }); // Load .env

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET_HASH,
  baseURL: process.env.BASE_URL,
  clientID: 'Ymdk3oOF0BXY0METau5IlNzqVo9IDyg1',
  issuerBaseURL: 'https://adrianoo.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));

// req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

module.exports = config;