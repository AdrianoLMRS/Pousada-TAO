const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, },
    name: String,
    phone: {
      type: String,
      required: true,
    },
    address: String,
    customerId: { 
      type: String, 
      required: true,
      unique: true,
      immutable: true, 
    }, // ! Stripe customer ID (Unique to identify users)
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);