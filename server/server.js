const { webcrypto } = require('crypto');
globalThis.crypto = webcrypto;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('Doctor Appointment API is running...');
});

const authRoutes = require('./routes/authroutes');
const appointmentRoutes = require('./routes/appointmentroutes');
const serviceRoutes = require('./routes/serviceroutes');
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/services', serviceRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/doctor_appointment';

console.log('Connecting to database...');

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected successfully!');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    app.listen(PORT, () => console.log(`Server running on port ${PORT} (Database not connected yet)`));
  });