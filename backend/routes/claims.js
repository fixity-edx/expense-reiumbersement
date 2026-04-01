const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Claim = require('../models/Claim');
const { summarizeClaim, sendEmail } = require('../utils/ai');
const User = require('../models/User');

// @route   POST api/claims
// @desc    Create a claim
// @access  Private
router.post('/', auth, async (req, res) => {
    const { description, amount, category } = req.body;

    try {
        // AI Integration
        const aiSummary = await summarizeClaim(description, amount);

        const newClaim = new Claim({
            description,
            amount,
            category: category || 'Other',
            user: req.user.id,
            aiSummary
        });

        const claim = await newClaim.save();
        res.json(claim);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/claims
// @desc    Get all claims (Admin sees all, User sees own)
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        let claims;
        if (req.user.role === 'admin') {
            claims = await Claim.find().populate('user', ['name', 'email']).sort({ date: -1 });
        } else {
            claims = await Claim.find({ user: req.user.id }).sort({ date: -1 });
        }
        res.json(claims);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/claims/:id
// @desc    Update claim status (Admin only)
// @access  Private
router.put('/:id', auth, async (req, res) => {
    const { status } = req.body;

    try {
        let claim = await Claim.findById(req.params.id);

        if (!claim) return res.status(404).json({ msg: 'Claim not found' });

        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        claim.status = status;

        await claim.save();

        // Return populated claim
        claim = await Claim.findById(req.params.id).populate('user', ['name', 'email']);

        // Notification
        if (claim.user && claim.user.email) {
            const subject = `Claim Updated: ${status}`;
            const text = `Hello ${claim.user.name},\n\nYour reimbursement claim for $${claim.amount} "${claim.description}" has been ${status}.\n\nView details on your dashboard.`;
            await sendEmail(claim.user.email, subject, text);
        }

        res.json(claim);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
