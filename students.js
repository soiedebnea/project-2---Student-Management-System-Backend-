// ============================================================
// STUDENT ROUTES
// ============================================================
// This file maps URLs + HTTP methods to controller functions.
// It does NOT contain any logic itself — it just wires things up.
// ============================================================

const express = require('express');
const router = express.Router();

const {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');

// GET    /api/students       → fetch all students
router.get('/', getStudents);

// POST   /api/students       → create a new student
router.post('/', createStudent);

// PUT    /api/students/:id   → update one student by ID
router.put('/:id', updateStudent);

// DELETE /api/students/:id   → delete one student by ID
router.delete('/:id', deleteStudent);

module.exports = router;