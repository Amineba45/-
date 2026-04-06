'use strict';

const mongoose = require('mongoose');
const User = require('../models/User');
const { sanitizeUpdateData } = require('../utils/validators');

const getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, user });
    } catch (err) {
        next(err);
    }
};

const updateUserProfile = async (req, res, next) => {
    try {
        const allowed = ['firstName', 'lastName', 'phone'];
        const raw = {};
        for (const key of allowed) {
            if (req.body[key] !== undefined) raw[key] = req.body[key];
        }
        const updates = sanitizeUpdateData(raw);

        const user = await User.findByIdAndUpdate(
            new mongoose.Types.ObjectId(req.user.id),
            { $set: updates },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, user });
    } catch (err) {
        next(err);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password');
        res.json({ success: true, users });
    } catch (err) {
        next(err);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(
            new mongoose.Types.ObjectId(req.params.id)
        );
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, message: 'User deleted' });
    } catch (err) {
        next(err);
    }
};

module.exports = { getUserProfile, updateUserProfile, getAllUsers, deleteUser };