// *Dependecies
    const User = require('../db/models/User');
    const Reserva = require('../db/models/reservaModel');

const getProfile = async (req, res) => {
    try {
        // Get user details from the database using the customerId from JWT
        const user = await User.findOne({ customerId: req.user.customerId });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            email: user.email,
            name: user.name,
            phone: user.phone,
            address: user.address,
        });
    } catch (err) {
        console.error('Error retrieving user profile:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { getProfile };
