// // *Dependecies
//   const express = require('express');
//   const path = require('path');

// // *Constants  
//   const router = express.Router();
//   const { register, login } = require('../controllers/authController');

// // *Routes
//   // HTML static view /register
//   router.get('/register', (req, res) => {
//     res.sendFile(path.join(__dirname, '../../public/register.html'));
//   });

//   // HTML static view /login
//   router.get('/login', (req, res) => {
//     res.sendFile(path.join(__dirname, '../../public/login.html'));
//   });

//   router.post('/register', register); // Register user in MongoDB database + create JWT
//   router.post('/login', login); // Login user in MongoDB database + create JWT
  
// module.exports = router;