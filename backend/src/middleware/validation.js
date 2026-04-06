const { body, param, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};

const validateRegister = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('firstName').notEmpty().trim().withMessage('First name is required'),
  body('lastName').notEmpty().trim().withMessage('Last name is required'),
  handleValidationErrors
];

const validateLogin = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors
];

const validateStore = [
  body('name').notEmpty().trim().withMessage('Store name is required'),
  body('address').notEmpty().trim().withMessage('Address is required'),
  body('latitude').isFloat({ min: -90, max: 90 }).withMessage('Valid latitude is required'),
  body('longitude').isFloat({ min: -180, max: 180 }).withMessage('Valid longitude is required'),
  handleValidationErrors
];

const validateProduct = [
  body('name').notEmpty().trim().withMessage('Product name is required'),
  body('price').isFloat({ min: 0 }).withMessage('Valid price is required'),
  body('storeId').isMongoId().withMessage('Valid store ID is required'),
  body('categoryId').isMongoId().withMessage('Valid category ID is required'),
  handleValidationErrors
];

const validateOrder = [
  body('storeId').isMongoId().withMessage('Valid store ID is required'),
  body('items').isArray({ min: 1 }).withMessage('Order must have at least one item'),
  body('deliveryAddress').notEmpty().trim().withMessage('Delivery address is required'),
  body('paymentMethod').isIn(['orange_money', 'wave', 'cod']).withMessage('Valid payment method is required'),
  handleValidationErrors
];

module.exports = {
  validateRegister,
  validateLogin,
  validateStore,
  validateProduct,
  validateOrder,
  handleValidationErrors
};
