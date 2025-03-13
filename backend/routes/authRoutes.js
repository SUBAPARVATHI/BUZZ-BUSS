const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Admin login with username/password
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await AdminUser.findOne({ username });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin registration (optional – for initial setup)
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingAdmin = await AdminUser.findOne({ username });
    if (existingAdmin) return res.status(400).json({ message: 'Admin already exists' });
    const admin = await AdminUser.create({ username, password });
    res.json({ message: 'Admin registered successfully', admin });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Google OAuth login endpoint
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    // Generate JWT token for the authenticated user.
    const token = jwt.sign(
      { id: req.user._id, username: req.user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    // In a real application, you might redirect with the token or set a cookie.
    res.json({ message: 'Google OAuth login successful', token });
  }
);

module.exports = router;
