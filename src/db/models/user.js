const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  auth0Id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  picture: String,
  lastLogin: { 
    type: Date,
    default: () => Date.now(), 
  },
  sub: { 
    type: String,
    unique: true,
  },
});

const User = mongoose.model('User', userSchema, 'Users');

module.exports = User;