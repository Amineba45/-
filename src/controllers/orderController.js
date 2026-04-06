'use strict';

const Order = require('../models/Order');
const Product = require('../models/Product');
const mongoose = require('mongoose');

const ALLOWED_STATUSES = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

const createOrder = async (req, res, next) => {
    try {
        const { store, products, deliveryAddress } = req.body;

        // Fetch all products in a single query
        const productIds = products.map(item => new mongoose.Types.ObjectId(item.product));
        const foundProducts = await Product.find({ _id: { $in: productIds } });

        if (foundProducts.length !== productIds.length) {
            return res.status(404).json({ success: false, message: 'One or more products not found' });
        }

        const productMap = new Map(foundProducts.map(p => [p._id.toString(), p]));
        let totalPrice = 0;
        const orderItems = [];
        for (const item of products) {
            const product = productMap.get(item.product);
            orderItems.push({ product: product._id, quantity: item.quantity, price: product.price });
            totalPrice += product.price * item.quantity;
        }

        const order = await Order.create({
            user: req.user.id,
            store,
            products: orderItems,
            totalPrice,
            deliveryAddress
        });

        res.status(201).json({ success: true, order });
    } catch (err) {
        next(err);
    }
};

const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find()
            .populate('user', 'firstName lastName email')
            .populate('store', 'name')
            .populate('products.product', 'name price');
        res.json({ success: true, orders });
    } catch (err) {
        next(err);
    }
};

const getUserOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: new mongoose.Types.ObjectId(req.user.id) })
            .populate('store', 'name')
            .populate('products.product', 'name price');
        res.json({ success: true, orders });
    } catch (err) {
        next(err);
    }
};

const getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(new mongoose.Types.ObjectId(req.params.id))
            .populate('user', 'firstName lastName email')
            .populate('store', 'name')
            .populate('products.product', 'name price');
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.json({ success: true, order });
    } catch (err) {
        next(err);
    }
};

const updateOrderStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const validStatus = ALLOWED_STATUSES.find(s => s === status);
        if (!validStatus) {
            return res.status(400).json({ success: false, message: 'Invalid status value' });
        }

        const order = await Order.findByIdAndUpdate(
            new mongoose.Types.ObjectId(req.params.id),
            { $set: { status: validStatus } },
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.json({ success: true, order });
    } catch (err) {
        next(err);
    }
};

module.exports = { createOrder, getOrders, getUserOrders, getOrderById, updateOrderStatus };