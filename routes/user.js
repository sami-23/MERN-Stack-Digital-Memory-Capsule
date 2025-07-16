const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Fetch potential recipients (all users except self)
router.get('/recipients', auth, async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.user.id } }, 'username email');
        res.json(users);
    } catch (err) {
        res.status(400).json({ error: 'Error fetching users', details: err.message });
    }
});

module.exports = router;