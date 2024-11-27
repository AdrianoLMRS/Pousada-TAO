// *Dependecies
  const path = require('path'); // Path for folders
  require('dotenv').config({ path: path.join(__dirname, '../.env') }); // Loads .env
  const jwt = require('jsonwebtoken');

const authorization = (req, res, next) => {
    const token = req.cookies.token; // Takes the cookie in token

    if (!token) {
        return res.status(403).json({ error: 'Access denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode JWT using secret
        req.user = decoded; // Add user info to request object
        next(); // Proceed to next middleware or route handler
    } catch (err) {
        console.error('Invalid token:', err);
        return res.status(400).json({ error: 'Invalid token' });
    }
};

module.exports = { authorization };
  