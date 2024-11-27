// *Dependecies
    const path = require('path'); // Path for folders
    require('dotenv').config({ path: path.join(__dirname, '../.env') }); // Loads .env
    const Reservation = require('../db/models/reservaModel'); // Imports Reservation Model
    const User = require('../db/models/User'); // Imports User model
    const jwt = require('jsonwebtoken');

// Utility function to create or update a user in the database
const createOrUpdateUser = async (customer) => {
  try {
      let user = await User.findOne({ customerId: customer.id });

      if (!user) {
          // Create a new user if not found
          user = new User({
              email: customer.email,
              name: customer.name || '',
              phone: customer.phone || '',
              address: '', // Address not available in customer.created
              customerId: customer.id,
          });
          console.log('New user created:', user);
      } else {
          // Update existing user's details
          user.email = customer.email;
          user.name = customer.name || '';
          user.phone = customer.phone || '';
          console.log('Existing user updated:', user);
      }

      await user.save();
      console.log('User saved or updated successfully:', user);

  } catch (err) {
      console.error('Error saving user to MongoDB:', err);
      throw new Error('User creation or update failed');
  }
};

// Utility function to save a reservation in the database
const saveReservation = async (session) => {
  try {
      const reservationData = {
          checkIn: session.metadata.checkIn,
          checkOut: session.metadata.checkOut,
          adults: parseInt(session.metadata.adultos, 10),
          children: parseInt(session.metadata.criancas, 10),
          totalAmount: session.amount_total / 100, // Convert from cents to BRL
          stripeSessionId: session.id,
          customerId: session.customer,
          paymentStatus: session.payment_status,
      };

      const reservation = new Reservation(reservationData);
      await reservation.save();

      console.log('Reservation successfully saved in the database:', reservation);
  } catch (err) {
      console.error('Error saving reservation to MongoDB:', err);
  }
};

// Utility function to generate a JWT token
const generateJWTToken = (s) => {
    try {
        const token = jwt.sign({ s }, process.env.JWT_SECRET, {
            expiresIn: '1h', // 1 hour expiration
        });
        console.log('Generated JWT token:', token); // Log the token for debugging
        return token;
    } catch (err) {
        console.error('Error generating JWT token:', err);
        throw new Error('Failed to generate JWT token.');
    }
};

module.exports = {
  createOrUpdateUser,
  saveReservation,
  generateJWTToken,
}