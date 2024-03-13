const { body } = require('express-validator');

const addProductValidation = () => {
  return [
    body('farmName')
      .notEmpty().withMessage('Farm name must not be empty')
      .isLength({ min: 3, max: 300 }).withMessage('Farm name must be between 3 and 300 characters long'),
    body('availableFrom')
      .notEmpty().withMessage('Available from must not be empty')
      .isISO8601().toDate().withMessage('Invalid date format'),
    body('product')
      .notEmpty().withMessage('Product name must not be empty'),
    body('contactPhone')
      .notEmpty().withMessage('Contact phone must not be empty')
      .matches(/^\+998\d{9}$/).withMessage('Invalid phone number format. It must be +998xxxxxxxxx'),
    body('inStock')
      .notEmpty().withMessage('In stock must not be empty'),      
  ];
};

module.exports = {
    addProductValidation
};
