const express = require('express');
const productRouter = require('../product.router');
const userRouter = require('./user/user.router.js');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Middleware for JSON
app.use(bodyParser.json());

// Register routes
app.use('/', productRouter);
app.use(userRouter);

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
