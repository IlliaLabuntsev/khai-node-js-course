const express = require('express');
const products = require('./products');
const { blockSpecialBrand } = require('./middleware');

const router = express.Router();

// -------------------------------------------
// ERROR TEST ROUTE (must be FIRST)
// -------------------------------------------
router.get('/productswitherror', (req, res) => {
    let err = new Error("processing error!");
    err.statusCode = 400;
    throw err;
});

// Get all products
router.get('/products', (req, res) => {
    res.json(products);
});

// Get product by ID
router.get('/products/id/:id', (req, res) => {
    const { id } = req.params;

    const product = products.find(p => p.id === Number(id));

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
});

// Get products by brand
router.get('/products/:brand', blockSpecialBrand, (req, res) => {
    const { brand } = req.params;

    const filtered = products.filter(
        product => product.brand.toLowerCase() === brand.toLowerCase()
    );

    res.json(filtered);
});

module.exports = router;
