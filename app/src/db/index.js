// * DEPENDECIES :
    const path = require('path'); // Path for folders
    require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); // Enviroment variables
    const mongoose = require('mongoose');

// *MongoDB
    const URI = process.env.MONGO_URI; // MongoDB URI for ATLAS
    const NODE_ENV = process.env.NODE_ENV; // If failed to connect to DB

const connectDB = async () => {
    // Mongoose connect to the DB
    try {
        const db = await mongoose.connect(URI);

        console.log('MongoDB connected:', db.connection.host);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        // Exit only if in production environment
        if (NODE_ENV === 'production') {
            console.log('\nProgram failed to connect to MongoDB, crashing...\n');
            process.exit(1); // Exit failure
        } else {
            console.log('Connecting without MongoDB Database')
        }
    }
};

module.exports = { connectDB }; // Export connectDB() function