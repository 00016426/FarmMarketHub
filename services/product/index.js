const fs = require('fs');

// Access global mock db file
const products = require(global.mock_db);

// Write service method implementations
const ticket_service = {
    getAll() {
        return products;
    },
    getById(id) {
        return products.find(p => p.id == id);
    },    
    create(productData) {
        let new_id = genRandId(4);
                
        const newProduct = {
            id: new_id,
            product: productData
        };

        products.push(newProduct);
        
        writeToFile(products);
        
        return newProduct;
    },
    update(id, updateData) {
        const productIndex = products.findIndex(p => p.id == id);

        if (productIndex === -1) {
            return null;
        }

        products[productIndex].product = { ...products[productIndex].product, ...updateData };

        writeToFile(products);

        return products[productIndex];
    },
    delete(id) {
        const index = products.findIndex(p => p.id == id);
        products.splice(index, 1);    
        writeToFile(products);
    }
};

// Create function for overwriting the db file updated db content
const writeToFile = async (data) => {
    await fs.writeFileSync(global.mock_db, JSON.stringify(data, null, 4), 'utf8');
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

module.exports = ticket_service;
