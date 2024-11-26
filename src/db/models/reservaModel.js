const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  checkIn: String,
  checkOut: String,
  adults: Number,
  children: Number,
  totalAmount: Number,
  stripeSessionId: String,
  paymentStatus: String,
});

const Reservation = mongoose.model('Reservation', ReservationSchema);

module.exports = Reservation;