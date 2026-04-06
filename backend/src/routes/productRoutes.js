const express = require('express');
const router = express.Router();
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { validateProduct } = require('../middleware/validation');

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', protect, authorize('store_admin', 'super_admin'), validateProduct, createProduct);
router.put('/:id', protect, authorize('store_admin', 'super_admin'), updateProduct);
router.delete('/:id', protect, authorize('store_admin', 'super_admin'), deleteProduct);

module.exports = router;
