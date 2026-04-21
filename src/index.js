const express = require('express');
const productRoutes = require('./product.routes');
const userRouter = require('./user/user.router.js');
const bodyParser = require('body-parser');
const productRouter = require('./product/product.router');
const app = express();
const PORT = 3000;

// Middleware for JSON
app.use(productRoutes);
app.use(bodyParser.json());
app.use(userRouter);
app.use(productRouter);

// Register routes
console.log(productRouter);

// app.post('/products', (req, res) => {
//     res.send('WORKS');
// });

// Global error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).json({
        error: err.message || 'Internal Server Error'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
