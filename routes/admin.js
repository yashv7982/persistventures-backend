const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// OPTIONAL: Admin Registration Route (consider protecting this or running it once)
router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const admin = new Admin({
      email: req.body.email,
      password: hashedPassword
    });
    const newAdmin = await admin.save();
    res.status(201).json(newAdmin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) return res.status(400).json({ message: 'Cannot find admin' });
    
    if (await bcrypt.compare(req.body.password, admin.password)) {
      // Sign a JWT token (replace 'your_jwt_secret' with your secret key)
      const token = jwt.sign({ email: admin.email, id: admin._id }, 'your_jwt_secret', { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(403).json({ message: 'Incorrect password' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
