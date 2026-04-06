const express = require('express');
const router = express.Router();
const { getOrders, getOrder, createOrder, updateOrderStatus } = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { validateOrder } = require('../middleware/validation');

router.get('/', protect, getOrders);
router.get('/:id', protect, getOrder);
router.post('/', protect, authorize('customer'), validateOrder, createOrder);
router.put('/:id/status', protect, authorize('store_admin', 'super_admin'), updateOrderStatus);

module.exports = router;
