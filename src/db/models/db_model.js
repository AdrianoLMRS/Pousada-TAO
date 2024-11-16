const mongoose = require('mongoose');

// Definindo o Schema
const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Boolean, default: true }
});

// Criando o modelo
const Room = mongoose.model('Room', roomSchema);

module.exports = Room;