// Import specific service class
const product_service = require('../../../services/product'); 

// Define product controller actions
const product_controller = {
    getAll(req, res) {
        res.json(product_service.getAll());
    },
    create(req, res) {
        const newProduct = product_service.create(req.body); 
        res.status(201).json(newProduct);
    },
    delete(req, res) {
        const product = product_service.getById(req.params.id);
        
        if (product) {
            product_service.delete(req.params.id);
            res.status(204).send('Product deleted successfully');
        } else {
            res.status(404).send('Product not found');
        }
    }
};

module.exports = product_controller;
