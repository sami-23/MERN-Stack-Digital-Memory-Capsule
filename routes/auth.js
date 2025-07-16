const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user._id, username: user.username, email: user.email }});
  } catch(err) {
    res.status(400).json({ error: 'Registration failed', details: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    const user = await User.findOne({ 
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
    });
    if (!user) return res.status(400).json({ error: 'Invalid Credentials' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid Credentials' });

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user._id, username: user.username, email: user.email }});
  } catch(err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
});

module.exports = router;