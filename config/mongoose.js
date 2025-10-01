require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI || process.env.DB_URI;

async function connectDB() {
    if (!uri) {
        console.error('MongoDB URI not set (MONGO_URI or DB_URI)');
        return;
    }
    try {
        await mongoose.connect(uri);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
}

module.exports = connectDB;
