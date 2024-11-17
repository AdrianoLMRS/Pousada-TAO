const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    checkinDate: Date,
    checkoutDate: Date,
    adults: {
        type: Number,
        min: 0, 
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} não é um número inteiro',
        },
    },
    children: {
        type: Number,
        min: 0, 
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} não é um número inteiro',
        },
    },
    sessionId: String,
    paymentStatus: String,
    totalPrice: {
        type: Number, // Float Number
        min: 0, 
    },
}, { timestamps: true });

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;