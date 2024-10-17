const asyncHandler = require('express-async-handler')
const User = require('../models/userModel.js');
const generateToken = require('../utils/generateToken.js');
const { sendEmail } = require('../utils/sendEmail.js');
const { generateRandomPassword } = require('../utils/generateRandomPassword.js')
const validator = require('validator')
const mongoose = require('mongoose')


// Controller to fetch users with role 'Office Staff' or 'Librarian'
module.exports.getStaffLib = asyncHandler(async (req, res) => {
  try {
    const staffs = await User.find({
      role: { $in: ['Office Staff', 'Librarian'] }
    });

    res.status(200).json(staffs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Create User (Office Staff or Librarian)
module.exports.createUser = asyncHandler( async (req, res) => {
    const { name, email, role } = req.body;
  
    if (!name || !email || !role) {
      return res.status(400).json({ message: 'All fields are required' });
  }
  
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid Email" })
}
  
    const userExists = await User.findOne({ email })
    
    if (userExists) {
        res.status(400).json({message: "User already exists"})
    }
    
    try {
      const password = generateRandomPassword();
  
      // Send email with password
      await sendEmail(email, password, role);
  
        const user = await User.create({ name, email, password, role })
        
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  })
  
  // Update User (Office Staff or Librarian)
module.exports.updateStaffLib = asyncHandler(async (req, res) => {
  const { id } = req.params
  
    try {
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const updatedUser = await User.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })
      
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Delete User (Office Staff or Librarian)
module.exports.deleteStaffLib = asyncHandler(async (req, res) => {
    console.log(req.params.id);
    
    try {

      const user = await User.findById(req.params.id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  