require('dotenv').config(); // Require .env
const mongoose = require('mongoose');

// MongoDB Atlas connection string
const mongoURI = String(process.env.MONGO_URI);

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

console.log("Mongo URI: ", process.env.MONGO_URI); // Verifique se o valor está correto

module.exports = mongoose; 
module.exports = connectDB; 