const mongoose = require('mongoose'); // Mongoose for cacheSchema

const CacheSchema = new mongoose.Schema({
    customerId: { type: String, required: true }, // STRIPE customerId
    sessionId: { type: String, required: true }, // cs_ sessionId STRIPE
    hash: {type: String, required: true}, // Hash of STRIPE customerId
}, { timestamps: true }); // Timestamps

// Model based on the schema
const Cache = mongoose.model('Cache', CacheSchema);

module.exports = Cache;