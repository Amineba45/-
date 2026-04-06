'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, phone } = req.body;
        const normalizedEmail = String(email).toLowerCase();

        const existing = await User.findOne({ email: normalizedEmail });
        if (existing) {
            return res.status(409).json({ success: false, message: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ firstName, lastName, email: normalizedEmail, password: hashedPassword, phone });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({ success: true, token, user: { id: user._id, firstName, lastName, email: normalizedEmail, role: user.role } });
    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const normalizedEmail = String(email).toLowerCase();

        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ success: true, token, user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role } });
    } catch (err) {
        next(err);
    }
};

const logout = (req, res) => {
    res.json({ success: true, message: 'Logged out successfully' });
};

module.exports = { register, login, logout };