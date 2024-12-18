const express = require('express')
const router = express.Router()
const { protect, authorize } = require('../middleware/authMiddleware')
const { getStudents, addStudent, updateStudent, deleteStudent, getFeesDetails, getLibraryHistory } = require('../controllers/studentController')

// Get student details
router.get('/', protect, authorize(['Admin', 'Office Staff', 'Librarian']), getStudents);

// Create a student data
router.post('/', protect, authorize(['Admin', 'Office Staff']), addStudent);

// Update a student data
router.patch('/:id', protect, authorize(['Admin', 'Office Staff']), updateStudent);

// Delete a student data
router.delete('/:id', protect, authorize(['Admin', 'Office Staff']), deleteStudent);




module.exports = router