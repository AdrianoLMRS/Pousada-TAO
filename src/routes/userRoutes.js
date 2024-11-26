// *Dependecies
  const express = require('express');
  const { getProfile } = require('../controllers/userController');
  const router = express.Router();
  const path = require('path');

// *Routes

  // Profile route (protected) HTML static
  router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/profile.html')); // Send Profile static HTML
  });

  // Serve profile data as JSON
  router.get('/data', getProfile);

module.exports = router;