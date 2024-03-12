// Import specific service class
const product_service = require('../../../services/product'); 

// Define the product controller with its needed actions (methods)
const product_controller = {
    getAll(req, res) {
        res.json(product_service.getAll()); 
    }
};

module.exports = product_controller; 
