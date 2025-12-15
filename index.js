const express = require('express');
const productRouter = require('./product.router');

const app = express();
const PORT = 3000;

// Middleware for JSON
app.use(express.json());

// Register routes
// ❗ Якщо хочеш, щоб усі шляхи були типу /products...
app.use('/', productRouter);

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
