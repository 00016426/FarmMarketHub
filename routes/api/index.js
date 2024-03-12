const express = require('express');
const product_router = require('./product'); // Import the product router

const router = express.Router();

// Registering child routers
router.use('/product', product_router); // Use the product router for requests to /api/product

module.exports = router;
