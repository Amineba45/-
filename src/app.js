'use strict';

const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const corsMiddleware = require('./middleware/corsMiddleware');
const errorHandler = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');
const connectDB = require('./config/database');
const logger = require('./config/logger');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiLimiter);

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/stores', require('./routes/storeRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/password', require('./routes/passwordResetRoutes'));

// Health check
app.get('/health', (req, res) => {
    res.json({ success: true, status: 'OK' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler
app.use(errorHandler);

module.exports = app;