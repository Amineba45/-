'use strict';

const Store = require('../models/Store');
const { sanitizeUpdateData } = require('../utils/validators');
const mongoose = require('mongoose');

const createStore = async (req, res, next) => {
    try {
        const { name, address, email, phone } = req.body;
        const store = await Store.create({ name, address, email, phone, owner: req.user.id });
        res.status(201).json({ success: true, store });
    } catch (err) {
        next(err);
    }
};

const getStores = async (req, res, next) => {
    try {
        const stores = await Store.find().populate('owner', 'firstName lastName email');
        res.json({ success: true, stores });
    } catch (err) {
        next(err);
    }
};

const getStoreById = async (req, res, next) => {
    try {
        const store = await Store.findById(
            new mongoose.Types.ObjectId(req.params.id)
        ).populate('owner', 'firstName lastName email');
        if (!store) {
            return res.status(404).json({ success: false, message: 'Store not found' });
        }
        res.json({ success: true, store });
    } catch (err) {
        next(err);
    }
};

const updateStore = async (req, res, next) => {
    try {
        const updates = sanitizeUpdateData(req.body);
        const store = await Store.findByIdAndUpdate(
            new mongoose.Types.ObjectId(req.params.id),
            { $set: updates },
            { new: true, runValidators: true }
        );
        if (!store) {
            return res.status(404).json({ success: false, message: 'Store not found' });
        }
        res.json({ success: true, store });
    } catch (err) {
        next(err);
    }
};

const deleteStore = async (req, res, next) => {
    try {
        const store = await Store.findByIdAndDelete(
            new mongoose.Types.ObjectId(req.params.id)
        );
        if (!store) {
            return res.status(404).json({ success: false, message: 'Store not found' });
        }
        res.json({ success: true, message: 'Store deleted' });
    } catch (err) {
        next(err);
    }
};

module.exports = { createStore, getStores, getStoreById, updateStore, deleteStore };
