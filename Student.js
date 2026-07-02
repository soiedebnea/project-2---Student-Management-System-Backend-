// ============================================================
// STUDENT MODEL
// ============================================================
// A "model" defines the SHAPE of one student document in
// MongoDB. Mongoose uses this schema to validate data
// BEFORE it ever reaches the database.
// ============================================================

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true, // removes accidental leading/trailing spaces
    },
    roll: {
      type: String,
      required: [true, 'Student ID is required'],
      unique: true, // MongoDB will reject duplicate roll numbers
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      default: '',
    },
    dept: {
      type: String,
      required: [true, 'Department is required'],
    },
    year: {
      type: String,
      required: [true, 'Year is required'],
    },
    grade: {
      type: Number,
      required: [true, 'CGPA is required'],
      min: 0,
      max: 4,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Graduated', 'Suspended'],
      default: 'Active',
    },
  },
  {
    // timestamps automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

// mongoose.model('Student', studentSchema) creates a MongoDB
// collection called "students" (it auto-pluralizes the name)
// and gives us a JS object we can use to query/save/delete data.
module.exports = mongoose.model('Student', studentSchema);