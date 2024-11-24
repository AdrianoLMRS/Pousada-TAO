const express = require('express');

// *Controllers
  const profileController = require('../controllers/profileController');

// *Middlewares
  const saveUser = require('../middlewares/saveUser');

const router = express.Router();

// Login Route
router.get('/login', (req, res) => {
  res.redirect('/save-user');  // POST save user in the DB
});

// Logout Route
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/'); // Home page
});

// Save user in the DB route (/save-user)
router.post('/create-user', saveUser, (req, res) => {
  res.redirect('/profile'); // Redirect to the /profile
});

// Profile route
router.get('/profile', profileController.getProfile);

module.exports = router;
