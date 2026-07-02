// ============================================================
// STUDENT CONTROLLER
// ============================================================
// Controllers hold the ACTUAL LOGIC that runs when a route
// is hit. Routes just say "this URL exists" — controllers
// say "and here's what to DO when someone calls it."
// ============================================================

const Student = require('../models/Student');

// ── GET all students ──
// Handles: GET /api/students
async function getStudents(req, res) {
  try {
    // .find({}) with no filter returns ALL documents in the collection
    // .sort({ createdAt: -1 }) shows newest students first
    const students = await Student.find({}).sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// ── CREATE a new student ──
// Handles: POST /api/students
async function createStudent(req, res) {
  try {
    // req.body contains the JSON data sent from the frontend form
    const student = await Student.create(req.body);
    res.status(201).json(student); // 201 = "Created" status code
  } catch (error) {
    // If validation fails (e.g. missing required field, duplicate roll),
    // Mongoose throws an error which we catch and send back as 400
    res.status(400).json({ message: error.message });
  }
}

// ── UPDATE an existing student ──
// Handles: PUT /api/students/:id
async function updateStudent(req, res) {
  try {
    const { id } = req.params; // the :id part of the URL

    const updated = await Student.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
      // new: true        → return the UPDATED document, not the old one
      // runValidators: true → re-check schema rules on update too
    );

    if (!updated) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// ── DELETE a student ──
// Handles: DELETE /api/students/:id
async function deleteStudent(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Student.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
};