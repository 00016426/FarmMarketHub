const express = require('express');
const { validationResult } = require('express-validator');
const { addProductValidation, updateProductValidation, deleteProductValidation } = require('../../../validators/product');
const product_controller = require('../../../controllers/api/product');

const router = express.Router();

// Route to get all products
router.get('/', (req, res) => {
    product_controller.getAll(req, res);
});

// Route to add a new product
router.post('/', addProductValidation(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newProduct = await product_controller.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to update an existing product
router.put('/:id', updateProductValidation(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const productId = req.params.id;
        const updatedProduct = await product_controller.update(productId, req.body);
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to delete a product
router.delete('/:id', deleteProductValidation(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const productId = req.params.id;
        const deleted = await product_controller.delete(productId);
        if (!deleted) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
