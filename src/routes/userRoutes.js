'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/profile', authMiddleware, userController.getUserProfile);
router.put('/profile', authMiddleware, userController.updateUserProfile);
router.get('/', authMiddleware, userController.getAllUsers);
router.delete('/:id', authMiddleware, userController.deleteUser);

module.exports = router;
