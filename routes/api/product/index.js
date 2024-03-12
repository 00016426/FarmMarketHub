const express = require('express');
const router = express.Router();
const product_controller = require('../../../controllers/api/product'); // Import the product controller

// Define API routes
router.get('/', (req, res) => {
    product_controller.getAll(req, res); // Call the getAll function from the product controller
});

module.exports = router;
