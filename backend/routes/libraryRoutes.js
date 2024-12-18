const express = require('express')
const router = express.Router()
const { protect, authorize } = require('../middleware/authMiddleware')
const { getLibraryHistory, addLibraryHistory, updateLibraryHistory, deleteLibraryHistory } = require('../controllers/libraryController')

// Get library history
router.get('/', protect, authorize(['Admin', 'Office Staff', 'Librarian']), getLibraryHistory);

// Add new Library History
router.post('/', protect, authorize(['Admin', 'Office Staff', 'Librarian']), addLibraryHistory)

// Update Library History
router.patch('/:id', protect, authorize(['Admin', 'Office Staff', 'Librarian']), updateLibraryHistory)

// Delete Library Histiry
router.delete('/:id', protect, authorize(['Admin', 'Office Staff', 'Librarian']), deleteLibraryHistory)

module.exports = router