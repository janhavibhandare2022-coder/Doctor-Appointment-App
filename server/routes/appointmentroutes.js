const express = require('express');
const router = express.Router();
const multer = require('multer');
const Appointment = require('../Models/Appointments');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/book', upload.single('reportFile'), async (req, res) => {
  try {
    const { patientId, patientName, department, date, time, comments } = req.body;
    const year = date ? new Date(date).getFullYear().toString() : '2026';

    const newAppointment = new Appointment({
      patientId,
      userId: patientId,
      patientName,
      department,
      date,
      time,
      year,
      comments,
      pastReport: req.file ? req.file.path : ''
    });

    await newAppointment.save();
    res.status(201).json({ message: 'Appointment booked successfully', appointment: newAppointment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/user/:patientId', async (req, res) => {
  try {
    const id = req.params.patientId;
    const appointments = await Appointment.find({
      $or: [{ userId: id }, { patientId: id }]
    }).sort({ createdAt: -1 });

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
// Delete appointment
router.delete('/:id', async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});