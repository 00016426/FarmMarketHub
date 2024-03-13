const { body, param } = require('express-validator');
const ticket_service = require('../../services/product');

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
    addProductValidation,
    updateProductValidation,
    deleteProductValidation
};
