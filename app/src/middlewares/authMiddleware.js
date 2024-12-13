// *Dependecies
    const path = require('path'); // Path for folders
    require('dotenv').config({ path: path.join(__dirname, '../.env') }); // Loads .env
    const JWT_SECRET = process.env.JWT_SECRET;
    const jwt = require('jsonwebtoken');

// Middleware to authenticate and extract the customerId from the token
const auth = (req, res, next) => {
    const token = req.cookies.authToken; // Get the authToken from the cookie

    if (!token) {
        // If no token, redirect user to /login page
        return res.redirect('/profile/login');
    }

    try {
        // Verify and decode the JWT token
        const decoded = jwt.verify(token, JWT_SECRET);
        req.customerId = decoded.customerId; // Add the customerId to the req object
        next();
    } catch (error) {
        console.error('Error authenticating token:', error.message);
        // If token is invalid or expired, redirect to /login page
        return res.redirect('/login');
    }
};

module.exports = auth;
