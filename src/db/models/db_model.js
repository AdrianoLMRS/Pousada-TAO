const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  auth0Id: {
    type: String,
    required: true,
    unique: true, // O ID do Auth0 será único para cada usuário
  },
  name: String,
  email: String,
  picture: String,
  // Outros dados do usuário que você deseja armazenar
});

const User = mongoose.model('User', userSchema, 'Users');

module.exports = User;