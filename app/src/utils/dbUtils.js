// *Dependencies
    const Reservation = require('../db/models/reservaModel'); // Imports Reservation Model
    const User = require('../db/models/userModel'); // Imports User model
    const Cache = require('../db/models/cacheModel'); // Imports Cache model
    const { encrypt } = require('./bcryptUtils');

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
        if (err.code === 11000) { // Check for duplicate key error (probaly e-mail)
            console.warn(`\nDuplicate key , proceding without creating user in DB\n: ${err.message}`);
            // TODO : Handle duplicate error (e.g., inform the user that the email already exists)
        } else {
            console.error('Error saving user to MongoDB:', err);
            throw err; // Program breaks
        }
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
          babies: parseInt(session.metadata.bebes, 10), 
          totalAmount: session.amount_total / 100, // Convert from cents to BRL
          stripeSessionId: session.id,
          customerId: session.customer,
          paymentStatus: session.payment_status,
          paymentId: session.payment_intent,
      };

      const reservation = new Reservation(reservationData);
      await reservation.save();

      console.log('Reservation successfully saved in the database:', reservation);
  } catch (err) {
      console.error('Error saving reservation to MongoDB:', err);
  }
};


// Function to save or update data in the "cache" collection
const saveCacheData = async (customerId, sessionId, hash) => {
    try {
        const newCache = new Cache({ customerId, sessionId, hash }); // Saves sessionId 2 times (normal & hash)
        await newCache.save();

        console.log('Cache data saved/updated.');
    } catch (err) {
        console.error('Error saving cache data:', err.message);
    }
};


// Exports all functions || schemas
module.exports = {
  createOrUpdateUser,
  saveReservation,
  saveCacheData,
}