const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const helmet = require('helmet');
const userRoutes = require('./routes/user.routes');

const app = express();

// 1. Middleware to log requests
app.use(morgan('dev'));

// 2. Enable CORS for all routes
app.use(cors());

// 3. Add Helmet to enhance security (HTTP headers)
app.use(helmet());

// 4. Compression middleware to reduce response body size
app.use(compression());

// 5. Rate limiting middleware to prevent brute-force attacks
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// 6. Parse incoming requests with JSON payloads
app.use(express.json());

// 7. Define routes
app.use('/api', userRoutes);

// 8. Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: err.message,
    });
});

module.exports = app;
