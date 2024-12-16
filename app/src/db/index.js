const path = require('path'); // Path for folders
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); // Enviroment variables

// *MongoDB
  const mongoose = require('mongoose');
  const URI = process.env.MONGO_URI; // MongoDB URI for ATLAS

const connectDB = async () => {
  // Mongoose connect to the DB
  try {
    const db = await mongoose.connect(URI);

    console.log('MongoDB connected:', db.connection.host);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit failure
  }
};

module.exports = { connectDB }; // Export connectDB() function