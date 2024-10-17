const express = require('express')
const router = express.Router()
const { protect, authorize } = require('../middleware/authMiddleware')
const { getFeesDetails, addFeesRemark, updateFeeRemark, deleteFeeRemark } = require('../controllers/feesController')

// Get fee details
router.get('/', protect, authorize(['Admin', 'Office Staff']), getFeesDetails);

// Create a new fee data
router.post('/', protect, authorize(['Admin', 'Office Staff']), addFeesRemark);

// Update a fee data
router.put('/:id', protect, authorize(['Admin', 'Office Staff']), updateFeeRemark);

// Delete a fee data
router.delete('/:id', protect, authorize(['Admin', 'Office Staff']), deleteFeeRemark);



module.exports = router