const express = require('express');
const router = express.Router();
const { getUsers, getUser, updateUser, deleteUser, updateProfile, getProfile } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, authorize('super_admin'), getUsers);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/:id', protect, authorize('super_admin'), getUser);
router.put('/:id', protect, authorize('super_admin'), updateUser);
router.delete('/:id', protect, authorize('super_admin'), deleteUser);

module.exports = router;
