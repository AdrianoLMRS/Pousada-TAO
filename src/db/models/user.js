const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: String,
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    address: String,
    customerId: { 
      type: String, 
      required: true,
      unique: true,
      immutable: true, 
    }, // Stripe customer ID
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
