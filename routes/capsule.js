const express = require('express');
const router = express.Router();
const Capsule = require('../models/Capsule');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Create a capsule
router.post('/create', auth, async (req, res) => {
    try {
        const { title, content, media, recipients, unlockDate } = req.body;

        const capsule = new Capsule({
            owner: req.user.id,
            title,
            content,
            media,
            recipients,
            unlockDate
        });

        await capsule.save();
        res.json(capsule);
    } catch (err) {
        res.status(400).json({ error: 'Error creating capsule', details: err.message });
    }
});

// List own and received capsules
router.get('/my', auth, async (req, res) => {
    const userId = req.user.id;
    try {
        const own = await Capsule.find({ owner: userId }).populate('recipients', 'username email');
        const received = await Capsule.find({ recipients: userId }).populate('owner', 'username email');
        res.json({ own, received });
    } catch (err) {
        res.status(400).json({ error: 'Error fetching capsules', details: err.message });
    }
});

// Open a capsule (unlock after date)
router.post('/open/:id', auth, async (req, res) => {
    try {
        const capsule = await Capsule.findById(req.params.id);
        if (!capsule) return res.status(404).json({ error: 'Capsule not found' });
        if (!(capsule.owner.equals(req.user.id) || capsule.recipients.includes(req.user.id))) {
            return res.status(403).json({ error: 'No access' });
        }
        if (capsule.unlockDate > new Date()) {
            return res.status(401).json({ error: 'Capsule not unlocked yet' });
        }
        if (!capsule.isOpened) {
            capsule.isOpened = true;
            capsule.openedAt = new Date();
            await capsule.save();
        }
        res.json(capsule);
    } catch (err) {
        res.status(400).json({ error: 'Error opening capsule', details: err.message });
    }
});

// Capsule timeline (ordered for visualization)
router.get('/timeline', auth, async (req, res) => {
    const userId = req.user.id;
    try {
        const events = await Capsule.find({ 
            $or: [
                { owner: userId },
                { recipients: userId }
            ]
        }).sort('unlockDate').populate('owner', 'username').populate('recipients', 'username');
        res.json(events);
    } catch (err) {
        res.status(400).json({ error: 'Failed to get timeline', details: err.message });
    }
});

module.exports = router;