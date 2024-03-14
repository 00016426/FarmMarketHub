const { body, param } = require('express-validator');
const product_service = require('../../services/product');

const addProductValidation = () => {
  return [
    body('farmName')
      .notEmpty().withMessage('Farm name must not be empty')
      .isLength({ min: 2, max: 255 }).withMessage('Farm name must be between 2 and 255 characters long'),
    body('availableFrom')
      .notEmpty().withMessage('Available from date must not be empty')
      .matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d\s([01][0-9]|2[0-3]):([0-5][0-9])$/, 'g')
      .withMessage('Invalid date and time format. Please use "DD/MM/YYYY HH:mm" format.'),
    body('product')
      .notEmpty().withMessage('Product must not be empty')
      .isLength({ min: 2, max: 255 }).withMessage('Product must be between 2 and 255 characters long'),
    body('contactPhone')
      .notEmpty().withMessage('Contact phone must not be empty')
      .matches(/^\+998\d{9}$/).withMessage('Invalid phone number format, it must be +998xxxxxxxxx'),
    body('inStock')
      .notEmpty().withMessage('In stock must not be empty')
      .isInt({ min: 0 }).withMessage('In stock must be a non-negative integer'), // Updated rule to accept numbers
  ];
};

const updateProductValidation = () => {
  return [
    param('id').custom(async (id) => {
      const exists = await product_service.getById(id);
      if (!exists) {
        throw new Error('Product not found');
      }
    }),
    body('farmName')
      .notEmpty().withMessage('Farm name must not be empty')
      .isLength({ min: 2, max: 255 }).withMessage('Farm name must be between 2 and 255 characters long'),
    body('availableFrom')
      .notEmpty().withMessage('Available from date must not be empty')
      .matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d\s([01][0-9]|2[0-3]):([0-5][0-9])$/, 'g')
      .withMessage('Invalid date and time format. Please use "DD/MM/YYYY HH:mm" format.'),
    body('product')
      .notEmpty().withMessage('Product must not be empty')
      .isLength({ min: 2, max: 255 }).withMessage('Product must be between 2 and 255 characters long'),
    body('contactPhone')
      .notEmpty().withMessage('Contact phone must not be empty')
      .matches(/^\+998\d{9}$/).withMessage('Invalid phone number format, it must be +998xxxxxxxxx'),
    body('inStock')
      .notEmpty().withMessage('In stock must not be empty')
      .isInt({ min: 0 }).withMessage('In stock must be a non-negative integer') // Updated rule to accept numbers
  ];
};

const deleteProductValidation = () => {
  return [
    param('id').custom(async (id) => {
      const exists = await product_service.getById(id);
      if (!exists) {
        throw new Error('Product not found');
      }
    })
  ];
};

module.exports = {
  addProductValidation,
  updateProductValidation,
  deleteProductValidation
};
