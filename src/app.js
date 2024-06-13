import express from 'express';
import json from 'body-parser';
import commandRoutes from './api/commandRoutes.js';
import queryRoutes from './api/queryRoutes.js';

const app = express();

// Middleware setup
app.use(json());

// Routes setup
app.use('/api/commands', commandRoutes);
app.use('/api/queries', queryRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

export default app;