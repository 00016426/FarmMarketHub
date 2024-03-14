const product_service = require('../../../services/product');

const home_controller = {
    index: async (req, res) => {
        res.render('home');
    },
    add: async (req, res) => {
        res.render('home/add_update', { mode: 'Add' });
    },
    update: async (req, res) => {
        const productData = await product_service.getById(req.params.id);
        res.render('home/add_update', { mode: 'Update', productData: productData });
    }
};

module.exports = home_controller;
