'use strict';

const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/User');
const validateRequest = require('../middleware/validateRequest');
const { passwordResetRequestSchema, passwordResetSchema } = require('../validation/schemas');
const logger = require('../config/logger');

// In-memory token store for simplicity (use a DB collection in production)
const resetTokens = new Map();

router.post('/request', validateRequest(passwordResetRequestSchema), async (req, res, next) => {
    try {
        const normalizedEmail = String(req.body.email).toLowerCase();
        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            // Respond with success to avoid email enumeration
            return res.json({ success: true, message: 'If that email exists, a reset link has been sent' });
        }

        const token = crypto.randomBytes(32).toString('hex');
        resetTokens.set(token, { userId: user._id.toString(), expires: Date.now() + 3600000 });

        logger.info(`Password reset token generated for ${normalizedEmail}`);
        // In production, send token via email (nodemailer)
        res.json({ success: true, message: 'If that email exists, a reset link has been sent' });
    } catch (err) {
        next(err);
    }
});

router.post('/reset', validateRequest(passwordResetSchema), async (req, res, next) => {
    try {
        const { token, password } = req.body;
        const entry = resetTokens.get(token);
        if (!entry || entry.expires < Date.now()) {
            return res.status(400).json({ success: false, message: 'Invalid or expired token' });
        }

        const hashed = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate(
            new mongoose.Types.ObjectId(entry.userId),
            { $set: { password: hashed } }
        );
        resetTokens.delete(token);

        res.json({ success: true, message: 'Password reset successful' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
