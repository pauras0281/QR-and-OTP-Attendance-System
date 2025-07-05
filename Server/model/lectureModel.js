// models/attendanceSession.js
const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
  lectureName: { type: String, unique: true, required: true },
  Date: { type: Date, required: true, default: Date.now },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  subject: {
    type: mongoose.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  otp: {
    type: String,
    default: null,
  },
  qrCode: {
    type: String,
    default: null,
  },
  otpExpiry: {
    type: Date,
    default: null,
  },
  qrCodeExpiry: {
    type: Date,
    default: null,
  },
  // Add additional fields as needed
  attendedStudents: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  absentStudents: [{ type: mongoose.Types.ObjectId, ref: 'User' }],

});

module.exports = mongoose.model("Lecture", lectureSchema);
