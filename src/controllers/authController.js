// *Dependecies
  const path = require('path');
  require('dotenv').config({ path: path.join(__dirname, '../.env') }); // Loads .env
  const jwt = require('jsonwebtoken');
  const User = require('../db/models/User');

// *Constants
  const TOKEN_DURATION = '1h' // 1 hour
  const COOKIE_DURATION = 3600000 // 1 hour in milliseconds

// *Exports functions
  // Register user in MongoDB + create token and save in cookie
    exports.register = async (req, res) => {
      const { name, email, password } = req.body;
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const user = new User({ name, email, password });
        await user.save();
        const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: TOKEN_DURATION  });
        // Set token in an HTTP-only cookie
        res.cookie('token', token, {
          httpOnly: true,   // Prevent JavaScript from accessing the cookie
          secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
          sameSite: 'Strict', // Prevent CSRF
          maxAge: COOKIE_DURATION,
        });
        
        res.status(200).json({ message: 'Register successful' });
      } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err });
      }
    };

  // Login user with MongoDB + create token and save in cookie
    exports.login = async (req, res) => {
      const { email, password } = req.body;
      try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: TOKEN_DURATION });
        
        // Set token in an HTTP-only cookie
        res.cookie('token', token, {
          httpOnly: true,   // Prevent JavaScript from accessing the cookie
          secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
          sameSite: 'Strict', // Prevent CSRF
          maxAge: COOKIE_DURATION,
        });
        
        res.status(200).json({ message: 'Login successful' });
      } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err });
      }
    };
  
  // Logout user = clear JWT token in cookies
    exports.logout = (req, res) => {
      res.clearCookie('token'); // Clear the token cookie
      res.status(200).json({ message: 'Logged out successfully' });
    };
    