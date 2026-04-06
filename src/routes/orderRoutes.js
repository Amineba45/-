'use strict';

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');
const { createOrderSchema, updateOrderStatusSchema } = require('../validation/schemas');

router.post('/', authMiddleware, validateRequest(createOrderSchema), orderController.createOrder);
router.get('/', authMiddleware, orderController.getOrders);
router.get('/user/my-orders', authMiddleware, orderController.getUserOrders);
router.get('/:id', authMiddleware, orderController.getOrderById);
router.put('/:id/status', authMiddleware, validateRequest(updateOrderStatusSchema), orderController.updateOrderStatus);

module.exports = router;
