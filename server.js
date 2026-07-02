// ============================================================
// SERVER ENTRY POINT
// ============================================================
// This is the file you actually RUN.
// It starts Express, connects to MongoDB, and tells the app
// which routes exist.
// ============================================================

require('dns').setServers(['8.8.8.8', '8.8.4.4']);
require('dotenv').config(); // loads variables from .env into process.env

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/students');

const app = express();

// ── Connect to MongoDB ──
connectDB();

// ── Middleware ──
// cors() allows the React frontend (running on a different port)
// to make requests to this backend without being blocked by the browser.
app.use(cors());

// express.json() lets us read JSON data sent in request bodies
// (e.g. the student form data from React)
app.use(express.json());

// ── Routes ──
// Every URL starting with /api/students goes to our student routes file
app.use('/api/students', studentRoutes);

// Simple health check route — useful for testing the server is alive
app.get('/', (req, res) => {
  res.send('Student Management API is running ✅');
});

// ── Start the server ──
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});