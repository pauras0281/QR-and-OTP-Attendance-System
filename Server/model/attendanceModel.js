// models/attendanceRecord.js
const mongoose = require('mongoose');

const attendanceRecordSchema = new mongoose.Schema({
  lectureId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lecture', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  attendanceStatus: { type: String, required: true } // 'present', 'absent'
  // Add additional fields as needed
});

export default mongoose.model('AttendanceRecord', attendanceRecordSchema);

