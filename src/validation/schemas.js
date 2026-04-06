'use strict';

const Joi = require('joi');

const registerSchema = Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().allow('').optional()
});

const loginSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().required()
});

const createStoreSchema = Joi.object({
    name: Joi.string().trim().required(),
    address: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required()
});

const updateStoreSchema = Joi.object({
    name: Joi.string().trim(),
    address: Joi.string().trim(),
    email: Joi.string().email(),
    phone: Joi.string(),
    status: Joi.string().valid('active', 'inactive')
});

const createProductSchema = Joi.object({
    name: Joi.string().trim().required(),
    description: Joi.string().allow('').optional(),
    price: Joi.number().positive().required(),
    store: Joi.string().required(),
    category: Joi.string().optional(),
    stock: Joi.number().min(0).default(0)
});

const updateProductSchema = Joi.object({
    name: Joi.string().trim(),
    description: Joi.string().allow(''),
    price: Joi.number().positive(),
    stock: Joi.number().min(0),
    category: Joi.string()
});

const createOrderSchema = Joi.object({
    store: Joi.string().required(),
    products: Joi.array().items(
        Joi.object({
            product: Joi.string().required(),
            quantity: Joi.number().integer().min(1).required()
        })
    ).min(1).required(),
    deliveryAddress: Joi.string().required()
});

const passwordResetRequestSchema = Joi.object({
    email: Joi.string().email().lowercase().required()
});

const passwordResetSchema = Joi.object({
    token: Joi.string().required(),
    password: Joi.string().min(6).required()
});

const updateOrderStatusSchema = Joi.object({
    status: Joi.string().valid('pending', 'confirmed', 'shipped', 'delivered', 'cancelled').required()
});

module.exports = {
    registerSchema,
    loginSchema,
    createStoreSchema,
    updateStoreSchema,
    createProductSchema,
    updateProductSchema,
    createOrderSchema,
    updateOrderStatusSchema,
    passwordResetRequestSchema,
    passwordResetSchema
};
