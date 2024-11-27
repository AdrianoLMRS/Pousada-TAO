const jwt = require('jsonwebtoken');
const User = require('../db/models/User');

const authorization = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'Authentication token not found' });
    }

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user associated with the customerId in the token
        const user = await User.findOne({ customerId: decoded.customerId });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Attach user data to the request object for further use
        req.user = user;
        next();
    } catch (err) {
        console.error('Error verifying token:', err);
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

module.exports = { authorization };