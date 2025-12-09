const express = require('express');
const products = require('./products');

const router = express.Router();

// GET /products — повертає всі продукти
router.get('/products', (req, res) => {
    return res.json(products);
});

// GET /products/:brand — повертає продукти певного бренду
router.get('/products/:brand', (req, res) => {
    const { brand } = req.params; // отримуємо brand з URL

    // фільтруємо товари за брендом
    const filteredProducts = products.filter(
        product => product.brand.toLowerCase() === brand.toLowerCase()
    );

    return res.json(filteredProducts);
});

module.exports = router;
