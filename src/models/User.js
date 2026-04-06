'use strict';

const mongoose = require('mongoose');

// Define User Schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Roles could be defined as needed
        default: 'user'
    }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

// Create User model
const User = mongoose.model('User', userSchema);

module.exports = User;
