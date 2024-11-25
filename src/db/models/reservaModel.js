const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // _id in users colection
    ref: 'Users', // Users collection
    required: true,
  },  
  checkinDate: {
        type: Date,
        required: true,
    },
    checkoutDate: {
        type: Date,
        required: true,
    },
    adults: {
        type: Number,
        required: true,
        min: 1,
    },
    children: {
        type: Number,
        required: true,
        min: 0,
    },
    totalPrice: {
        type: Number, // em centavos
        required: true,
        min: 0,
    },
    stripeSessionId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Reserva = mongoose.model('Reserva', reservaSchema);

module.exports = Reserva;