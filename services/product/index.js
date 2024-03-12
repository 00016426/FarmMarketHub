const fs = require('fs');
// Access global mock db file
const products = require(global.mock_db); 

// Write service method implementations
const product_service = {
    getAll() {
        return products; 
    }
};

module.exports = product_service; 
