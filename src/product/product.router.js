const express = require('express');
const db = require('../db');
const { products } = require('../db/schema');
const { eq } = require('drizzle-orm');

const router = express.Router();

router.post('/products', async (request, response) => {
    const { body } = request;

    await db.insert(products).values(body);

    return response.sendStatus(201);
});

router.get('/users/:id/products', async (request, response) => {
    const { id } = request.params;

    const userProducts = await db.query.products.findMany({
        where: eq(products.userId, +id)
    });

    return response.json(userProducts);
});

module.exports = router;