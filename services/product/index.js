const fs = require('fs');

// Access global mock db file
const products = require(global.mock_db); // Assuming your mock database for products is named products

// Write service method implementations
const product_service = {
    getAll() {
        return products;
    },
    create(productData) {
        const new_id = genRandId(4);
                
        const newProduct = {
            id: new_id,
            product: productData
        };

        products.push(newProduct);
        
        writeToFile(products);
        
        return newProduct;
    }
};

// Function for overwriting the db file with updated content
const writeToFile = (data) => {
    fs.writeFileSync(global.mock_db, JSON.stringify(data, null, 4), 'utf8');
};

// Generate random id inspired by uuid
const genRandId = (count) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < count; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

module.exports = product_service;
