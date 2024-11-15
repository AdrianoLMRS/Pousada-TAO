const mongoose = require('mongoose');
require('dotenv').config(); // Require .env

// MongoDB Atlas connection string
const mongoURI = process.env.MONGO_URI;

// Conect MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conexão com MongoDB estabelecida com sucesso!');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1); // Fail: Close process
  }
};

connectDB();

module.exports = mongoose; 
module.exports = connectDB; 
