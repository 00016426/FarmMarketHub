const express = require('express');
const { validationResult } = require('express-validator');
const { addProductValidation } = require('../../../validators/product'); // Assuming you have a product validator

const router = express.Router();
const product_controller = require('../../../controllers/api/product'); // Assuming your controller is named product_controller

// Define API routes
router.get('/', (req, res) => {
    product_controller.getAll(req, res);
});

router.post('/', addProductValidation(), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    product_controller.create(req, res);
});

module.exports = router;
