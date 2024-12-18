const asyncHandler = require('express-async-handler')
const User = require('../models/userModel.js');
const generateToken = require('../utils/generateToken.js');



// Login 
module.exports.loginUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body
    
    const user = await User.findOne({ email })
    
    if (!user) {
      res.status(400).json({message: "Incorrect Email"})
    }

    if (await user.matchPassword(password)) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        })
    } else {
      res.status(400).json({ message: "Incorrect password" })
    }
})

