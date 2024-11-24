const User = require('../db/models/User');

// Retrieve user profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Decoded from JWT middleware
    const user = await User.findById(userId).select('-password'); // Exclude password field
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile', error: err });
  }
};
