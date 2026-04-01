const mongoose = require('mongoose');

const ClaimSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    category: {
        type: String,
        enum: ['Travel', 'Food', 'Office', 'Software', 'Other'],
        default: 'Other'
    },
    aiSummary: {
        type: String
    }
});

module.exports = mongoose.model('Claim', ClaimSchema);
