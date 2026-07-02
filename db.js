// ============================================================
// DATABASE CONNECTION
// ============================================================
// This file's ONLY job is to connect to MongoDB.
// We keep it separate from server.js so the connection logic
// is easy to find and easy to swap out later if needed.
// ============================================================

const mongoose = require('mongoose');

async function connectDB() {
  try {
    // mongoose.connect() reads the connection string from .env
    // and opens a connection to your MongoDB database.
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    // If the database is not running or the URI is wrong,
    // we log the error and STOP the server — there's no point
    // running an API that can't reach its database.
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

module.exports = connectDB;