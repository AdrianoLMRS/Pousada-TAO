const mongoose = require('mongoose');

// RESERVATION SCHEMA AFTER THE PAYMENT CONFIRMATION
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

// CACHE SCHEMA IF THE USER DON'T/SKIP PAYMENT
const cacheSchema = new mongoose.Schema({
    checkinDate: Date,
    checkoutDate: Date,
    adults: Number,
    children: Number,
    sessionId: String,
    status: { type: String, default: 'incomplete' },
    createdAt: { type: Date, default: Date.now, expires: '1h' }, // TTL
});

// CONSTANTS FOR module.exports
const Reservation = mongoose.model('Reservation', reservationSchema);
const Cache = mongoose.model('Cache', cacheSchema);

// Export models
module.exports = { Reservation, Cache };