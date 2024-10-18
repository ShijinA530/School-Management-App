const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentID: {
    type: String,
    required: true,
    unique: true, 
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    },
    address: {
        type: String,
        required: true,
      },
  class: {
    type: String,
    required: true,
  },
  division: {
    type: String,
    required: true
  },
  feesHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FeesRemarks',
    }
  ],
  libraryHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LibraryHistory',
    }
  ],
  guardianName: {
      type: String,
      required: true,
    },
    guardianNumber: {
      type: String,
      required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
