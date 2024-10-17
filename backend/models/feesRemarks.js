const mongoose = require('mongoose')

const feesRemarksSchema = mongoose.Schema({
    studentID: { type: String, required: true },
    feeType: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentDate: { type: Date, required: true },
    paymentStatus: { type: String, required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }
}, { timestamps: true })


module.exports = mongoose.model('FeesRemarks', feesRemarksSchema)

//enum: ['Tuition Fee', 'Library Fee', 'Lab Fee', 'Exam Fee', 'Other']
//enum: ['Paid', 'Pending', 'Overdue'],