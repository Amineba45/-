'use strict';

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');
const { createProductSchema, updateProductSchema } = require('../validation/schemas');

router.post('/', authMiddleware, validateRequest(createProductSchema), productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', authMiddleware, validateRequest(updateProductSchema), productController.updateProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;
