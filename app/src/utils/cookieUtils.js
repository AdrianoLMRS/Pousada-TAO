const jwt = require('jsonwebtoken'); // JWT lib

// Function to decode the JWT token from the cookie and return the decoded data
function decodeJWT(req, JWT) {
    const token = req.cookies[JWT]; // Get the authToken from the cookie

    if (!token) {
        throw new Error('No token found');
    }

    try {
        // Decode the JWT token using your JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded; // Return the decoded data
    } catch (error) {
        throw new Error('Error decoding token: ' + error.message);
    }
}

module.exports = { decodeJWT };