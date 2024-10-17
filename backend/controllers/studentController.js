const asyncHandler = require('express-async-handler')
const Student = require('../models/studentModel')
const mongoose = require('mongoose')
const validator = require('validator')

module.exports.getStudents = asyncHandler(async (req, res) => {
    try {
        const students = await Student.find()

        res.status(200).json(students)      
    } catch (error) {
        res.status(500).json({message: error.message})
    } 
})

module.exports.addStudent = asyncHandler(async (req, res) => {
    const { studentID, name, email, phoneNumber, address, class: studentClass, division, guardianName, guardianNumber } = req.body

    if (!studentID || !name || !email || !phoneNumber || !address || !studentClass || !division || !guardianName || !guardianNumber) {
      return res.status(400).json({ message: 'Please fill all the required fields.' });
    }
    
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid Email" })
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
        return res.status(400).json({ message: "Please enter a valid 10-digit phone number" });
    }
    

    if (!/^\d{10}$/.test(guardianNumber)) {
        return res.status(400).json({ message: "Please enter a valid 10-digit phone number" });
    }
    

    const studentExists = await Student.findOne({ $or: [{ studentID }, { email }] });
    if (studentExists) {
        res.status(400).json({ message: 'Student with this Email or ID already exists!' });
    }

    try {
        const createdStudent = await Student.create({
            ...req.body,
            feesHistory: [],
            libraryHistory: []
        })
        res.status(201).json(createdStudent)

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

module.exports.updateStudent = asyncHandler(async (req, res) => {
    const { studentID, name, email, phoneNumber, address, class: studentClass, division, guardianName, guardianNumber } = req.body
    const { id } = req.params

    if (!studentID || !name || !email || !phoneNumber || !address || !studentClass || !division || !guardianName || !guardianNumber) {
        return res.status(400).json({ message: 'Please fill all the required fields.' });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid Email" })
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
        return res.status(400).json({ message: "Please enter a valid 10-digit phone number" });
    }
    

    if (!/^\d{10}$/.test(guardianNumber)) {
        return res.status(400).json({ message: "Please enter a valid 10-digit phone number" });
    }
    
        

    // Check if a student with the same studentID or email exists, excluding the current student
    const studentExists = await Student.findOne({
        $or: [{ studentID }, { email }],
        _id: { $ne: id }
      })
  
      if (studentExists) {
        return res.status(400).json({ message: 'Student with this Email or ID already exists!' });
      }
  
    try {
        const updatedStudent = await Student.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

module.exports.deleteStudent = asyncHandler(async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Student Not Found'})
    }

    try {
        await Student.findOneAndDelete({ _id: id })
        res.json({ message: 'Student deleted successfully' });
    } catch(err){
        res.status(400).json({ error: err.message})
    }
})