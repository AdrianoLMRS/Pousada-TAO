// import { Schema, model } from 'mongoose';

// // RESERVATION SCHEMA AFTER THE PAYMENT CONFIRMATION
// const reservationSchema = new Schema({
//     checkinDate: Date,
//     checkoutDate: Date,
//     adults: {
//         type: Number,
//         min: 0, 
//         validate: {
//             validator: Number.isInteger,
//             message: '{VALUE} não é um número inteiro',
//         },
//     },
//     children: {
//         type: Number,
//         min: 0, 
//         validate: {
//             validator: Number.isInteger,
//             message: '{VALUE} não é um número inteiro',
//         },
//     },
//     sessionId: String,
//     paymentStatus: String,
//     totalPrice: {
//         type: Number, // Float Number
//         min: 0, 
//     },
// }, { timestamps: true });

// // CACHE SCHEMA IF THE USER DON'T/SKIP PAYMENT
// const cacheSchema = new Schema({
//     checkinDate: Date,
//     checkoutDate: Date,
//     adults: Number,
//     children: Number,
//     sessionId: String,
//     status: { type: String, default: 'incomplete' },
//     createdAt: { type: Date, default: Date.now, expires: '1h' }, // TTL
// });

// // CONSTANTS FOR module.exports
// const Reservation = model('Reservation', reservationSchema);
// const Cache = model('Cache', cacheSchema);

// // Export models
// export default { Reservation, Cache };