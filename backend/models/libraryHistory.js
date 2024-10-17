const mongoose = require('mongoose')

const libraryHistorySchema = mongoose.Schema({
    studentID: { type: String, required: true },
    bookName: { type: String, required: true },
    borrowDate: { type: Date, required: true },
    returnDate: { type: Date },
    status: { type: String, required: true },
    fineAmount: { type: Number, default: 0 },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }
}, { timestamps: true })


module.exports = mongoose.model('LibraryHistory', libraryHistorySchema)

// enum: ['Borrowed', 'Returned', 'Overdue'], 