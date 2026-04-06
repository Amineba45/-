'use strict';

const Product = require('../models/Product');
const { sanitizeUpdateData } = require('../utils/validators');
const mongoose = require('mongoose');

const createProduct = async (req, res, next) => {
    try {
        const { name, description, price, store, category, stock } = req.body;
        const product = await Product.create({ name, description, price, store, category, stock });
        res.status(201).json({ success: true, product });
    } catch (err) {
        next(err);
    }
};

const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find()
            .populate('store', 'name')
            .populate('category', 'name');
        res.json({ success: true, products });
    } catch (err) {
        next(err);
    }
};

const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(
            new mongoose.Types.ObjectId(req.params.id)
        ).populate('store', 'name').populate('category', 'name');
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json({ success: true, product });
    } catch (err) {
        next(err);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const updates = sanitizeUpdateData(req.body);
        const product = await Product.findByIdAndUpdate(
            new mongoose.Types.ObjectId(req.params.id),
            { $set: updates },
            { new: true, runValidators: true }
        );
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json({ success: true, product });
    } catch (err) {
        next(err);
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(
            new mongoose.Types.ObjectId(req.params.id)
        );
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json({ success: true, message: 'Product deleted' });
    } catch (err) {
        next(err);
    }
};

module.exports = { createProduct, getProducts, getProductById, updateProduct, deleteProduct };
