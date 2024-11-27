// *Dependecies
const express = require('express');
const path = require('path');
const { getProfile } = require('../controllers/userController');
const { authorization } = require('../middlewares/authMiddleware');
const router = express.Router();

// Serve the Profile HTML page (not protected)
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/profile.html')); // Send Profile static HTML
});

// Profile data route - Protected, requires valid JWT token in cookie
router.get('/data', authorization, getProfile); // This route is now protected by the authorization middleware

module.exports = router;