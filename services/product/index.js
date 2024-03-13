const fs = require('fs');

// access global mock db file
const products = require(global.mock_db);

// write service method implementations
const product_service = {
    getAll() {
        return products;
    },
    getById(id) {
        return products.find(product => product.id === id);
    },    
    create(productData) {
        let new_id = genRandId(4);
                
        const new_product = {
            id: new_id,
            product: productData
        };

        products.push(new_product);
        
        writeToFile(products);
        
        return new_product;
    },
    delete(id) {
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            products.splice(index, 1);
            writeToFile(products);
            return true; // Indicate success
        }
        return false; // Indicate failure
    }
};

// create function for overwriting the db file updated db content
let writeToFile = async (products) => {
    await fs.writeFileSync(global.mock_db, JSON.stringify(products, null, 4), 'utf8');
};

// generate random id inspired by uuid
let genRandId = (count) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < count; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

module.exports = product_service;
