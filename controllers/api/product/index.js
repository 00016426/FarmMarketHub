// import specific service class
const product_service = require('../../../services/product'); 

// mention the service's needed actions (methods)
const product_controller = {
    getAll(req, res) {
        res.json(product_service.getAll());
    },
    create(req, res) {
        const newProduct = product_service.create(req.body); 
        res.status(201).json(newProduct);
    }
};

module.exports = product_controller;
