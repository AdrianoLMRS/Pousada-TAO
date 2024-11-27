// *Dependecies
    const express = require('express');
    const { setJWTCookie } = require('../utils/cookieUtils');
    const router = express.Router();

// Route to set cookie when token is received
router.post('/set-cookie', (req, res) => {
    console.log('SET COOKIE API :', req.body)
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ error: 'Token is required' });
    }

    // Set the cookie with the JWT token
    setJWTCookie(res, token);

    return res.status(200).json({ message: 'Cookie set successfully' });
});

module.exports = router;
