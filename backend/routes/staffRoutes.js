const express = require('express')
const router = express.Router()
const { protect, authorize } = require('../middleware/authMiddleware')
const staffController = require('../controllers/staffController')

// Manage accounts of office staff and librarians
router.get('/', protect, authorize(['Admin']), staffController.getStaffLib)
router.post('/', protect, authorize(['Admin']), staffController.createUser)
router.patch('/:id', protect, authorize(['Admin']), staffController.updateStaffLib)
router.delete('/:id', protect, authorize(['Admin']), staffController.deleteStaffLib)

module.exports = router