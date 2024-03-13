const product_service = require('../../../services/product');

const product_controller = {
    getAll(req, res) {
        try {
            const products = product_service.getAll();
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    create(req, res) {
        try {
            const newProduct = product_service.create(req.body);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    update(req, res) {
        try {
            const product = product_service.update(req.params.id, req.body);
            if (product) {
                res.json(product);
            } else {
                res.status(404).send('Product not found');
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    delete(req, res) {
        try {
            const product = product_service.getById(req.params.id);
            if (product) {
                product_service.delete(req.params.id);
                res.status(204).send('Product deleted successfully');
            } else {
                res.status(404).send('Product not found');
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = product_controller;
