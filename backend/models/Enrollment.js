const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    progress: { type: Number, default: 0 }, // Percentage from 0 to 100
    completedLessons: [{ type: mongoose.Schema.Types.ObjectId }]
  },
  { timestamps: true }
);

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
module.exports = Enrollment;
