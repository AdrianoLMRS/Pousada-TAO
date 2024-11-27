// *Dependecies
    const path = require('path');
    require('dotenv').config({ path: path.join(__dirname, '../.env') }); // Loads .env
    const express = require('express');
    const jwt = require('jsonwebtoken');
    const { getProfile } = require('../controllers/userController');
    const { authorization } = require('../middlewares/authMiddleware');
    const User = require('../db/models/User'); // User model for database

const router = express.Router();

// Login route - Generates JWT token and sets it in the cookie
router.get("/login", async (req, res) => {
    const { customerId } = req.query; // Assume customerId is passed in the query string for login

    if (!customerId) {
        return res.status(400).json({ error: 'Customer ID is required for login' });
    }

    try {
        // Find user in the database by customerId
        const user = await User.findOne({ customerId });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Generate JWT token with the customerId
        const token = jwt.sign({ customerId: user.customerId }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set the token in the cookie
        res.cookie('token', token, {
            httpOnly: true, // Prevent client-side JavaScript access
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            maxAge: 3600000, // 1 hour
        });

        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Logout route - Clears the JWT cookie
router.get("/logout", authorization, (req, res) => {
    // Clear the JWT token from the cookie
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
});

// Serve profile data as JSON (protected route)
router.get('/data', authorization, getProfile);

module.exports = router;
