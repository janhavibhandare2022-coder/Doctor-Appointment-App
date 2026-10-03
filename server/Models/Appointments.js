const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: String,
    default: ''
  },
  userId: {
    type: String,
    default: ''
  },
  patientName: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  year: {
    type: String,
    default: '2026'
  },
  comments: {
    type: String,
    default: ''
  },
  pastReport: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);