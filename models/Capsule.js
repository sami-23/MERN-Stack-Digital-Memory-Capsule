const mongoose = require('mongoose');

const CapsuleSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String },
    content: { type: String },
    media: [{ type: String }], // URLs or base64 encoded strings
    recipients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    unlockDate: { type: Date },
    createdAt: { type: Date, default: Date.now },
    isOpened: { type: Boolean, default: false },
    openedAt: { type: Date }
});

module.exports = mongoose.model('Capsule', CapsuleSchema);