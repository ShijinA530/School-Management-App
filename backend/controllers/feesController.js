const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')
const FeesRemarks = require('../models/feesRemarks')
const Student = require('../models/studentModel')
const feesRemarks = require('../models/feesRemarks')

module.exports.getFeesDetails = asyncHandler(async (req, res) => {
    try {
        const feesDetails = await FeesRemarks.find().populate('student')
        res.status(200).json(feesDetails)      
    } catch (error) {
        res.status(500).json({message: error.message})
    } 
})

module.exports.addFeesRemark = asyncHandler(async (req, res) => {
    const { studentID, feeType, amount, paymentDate, paymentStatus } = req.body;

    if (!studentID || !feeType || !amount || !paymentDate || !paymentStatus) {
        res.status(400).json({message: "Please fill all the required fields."})
    }

    const student = await Student.findOne({ studentID });
    
    if (!student) {
        res.status(404).json({ message: "Student not found with this ID!" })
    }

    try {
        const newFeesRemark = await FeesRemarks.create({ ...req.body, student: student._id });

        student.feesHistory.push(newFeesRemark._id);
        await student.save();
        
        const populatedFeesRemark = await FeesRemarks.findById(newFeesRemark._id).populate('student');
        
        res.status(201).json(populatedFeesRemark);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports.updateFeeRemark = asyncHandler(async (req, res) => {
    const { studentID, feeType, amount, paymentDate, paymentStatus } = req.body;
  
    if ( !studentID || !feeType || !amount || !paymentDate || !paymentStatus) {
        return res.status(400).json({message: "Please fill all the required fields."})
    }
  
    try {
        const updatedFeeRemark = await FeesRemarks.findOneAndUpdate({ _id: req.params.id }, { ...req.body }, { new: true } )
        const populatedFeesRemark = await FeesRemarks.findById(updatedFeeRemark._id).populate('student');
        
        return res.status(201).json(populatedFeesRemark);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
  
module.exports.deleteFeeRemark = asyncHandler(async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Fees history not found!'})
    }

    try{
        await FeesRemarks.findOneAndDelete({_id: id})
        res.json({ message: 'Fees history removed successfully' });
    } catch(err){
        res.status(400).json({ error: err.message})
    }
});
