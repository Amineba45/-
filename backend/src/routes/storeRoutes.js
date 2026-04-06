const express = require('express');
const router = express.Router();
const { getStores, getStore, createStore, updateStore, deleteStore } = require('../controllers/storeController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { validateStore } = require('../middleware/validation');

router.get('/', getStores);
router.get('/:id', getStore);
router.post('/', protect, authorize('super_admin'), validateStore, createStore);
router.put('/:id', protect, authorize('store_admin', 'super_admin'), updateStore);
router.delete('/:id', protect, authorize('super_admin'), deleteStore);

module.exports = router;
