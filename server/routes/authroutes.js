const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User.js');

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, contactNumber } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword, contactNumber: contactNumber || '' });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secretKey', { expiresIn: '7d' });
    res.status(201).json({ token, user, message: 'Signup successful' });
  } catch (err) {
    console.log('SIGNUP ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secretKey', { expiresIn: '7d' });
    res.json({ token, user, message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;