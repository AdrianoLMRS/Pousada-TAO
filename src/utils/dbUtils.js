// *Dependecies
  const Reservation = require('../db/models/reservaModel'); // Imports Reservation Model
  const User = require('../db/models/User'); // Imports User model

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
  } catch (err) {
      console.error('Error saving user to MongoDB:', err);
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

module.exports = {
  createOrUpdateUser,
  saveReservation,
}