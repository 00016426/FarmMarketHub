const fs = require('fs');

// Access global mock db file
const products = require(global.mock_db); // Assuming your mock database for products is named products

// Write service method implementations
const product_service = {
    getAll() {
        return products;
    },
    getById(id) {
        return products.find(product => product.id === id);
    },    
    create(productData) {
        const newProduct = {
            id: genRandId(4),
            ...productData
        };

        products.push(newProduct);
        
        writeToFile(products);
        
        return newProduct;
    },
    update(id, updateData){
        const productIndex = products.findIndex(product => product.id === id);

        if (productIndex === -1) {
            return null;
        }

        products[productIndex] = {
            ...products[productIndex],
            ...updateData
        };

        writeToFile(products);

        return products[productIndex];
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

// Function for overwriting the db file with updated content
let writeToFile = async (products) => {
    try {
        await fs.writeFileSync(global.mock_db, JSON.stringify(products, null, 4), 'utf8');
    } catch (error) {
        console.error('Error writing to file:', error);
    }
};

// Generate random id inspired by uuid
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
