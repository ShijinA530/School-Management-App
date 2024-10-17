const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')
const LibraryHistory = require('../models/libraryHistory')
const Student = require('../models/studentModel')
const libraryHistory = require('../models/libraryHistory')

module.exports.getLibraryHistory = asyncHandler(async (req, res) => {
    try {
        const libraryHistory = await LibraryHistory.find().populate('student')
        res.status(200).json(libraryHistory)
    } catch (error) {
        res.status(500).json({ message: error.message }) 
    }
})

module.exports.addLibraryHistory = asyncHandler(async (req, res) => {
    const { studentID, bookName, borrowDate, returnDate, status, fineAmount } = req.body

    if (!studentID || !bookName || !borrowDate || !status) {
        res.status(400).json({message: "Please fill all the required fields."})
    }

    const student = await Student.findOne({ studentID })

    if (!student) {
        res.status(404).json({ message: "Student not found with this ID!" })
    }
    try {
        const newLibraryHistory = await LibraryHistory.create({ ...req.body, student: student._id })

        student.libraryHistory.push(newLibraryHistory._id);
        await student.save();
            
        const populatedLibraryHistory = await LibraryHistory.findById(newLibraryHistory._id).populate('student')

        res.status(201).json(populatedLibraryHistory)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports.updateLibraryHistory = asyncHandler(async (req, res) => {
    const { id } = req.params

    try {
        const updatedLibraryHistory = await LibraryHistory.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })
        const populateLibraryHistory = await LibraryHistory.findById(updatedLibraryHistory._id).populate('student')

        res.status(200).json(populateLibraryHistory)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports.deleteLibraryHistory = asyncHandler(async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Library history not found!'})
    }

    try{
        await LibraryHistory.findOneAndDelete({_id: id})
        res.json({ message: 'Library history removed successfully' });
    } catch(err){
        res.status(400).json({ error: err.message})
    }
});