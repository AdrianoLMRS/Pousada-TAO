const User = require('../db/models/User');
const Reserva = require('../db/models/reservaModel');

// Retrieve user profile
exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Decoded from JWT middleware
        const user = await User.findById(userId).select('-password'); // Exclude password field
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Fetch user reservations
        const reservas = await Reserva.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json({ user, reservas });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching profile', error: err });
    }
};