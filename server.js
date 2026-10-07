const express = require('express');
const client = require('prom-client');
const path = require('path');

const app = express();
const PORT = 3000;

// Enable default Node.js metrics
client.collectDefaultMetrics();

// Create HTTP request counter
const httpRequestCounter = new client.Counter({
    name: 'task_manager_http_requests_total',
    help: 'Total HTTP requests received'
});

// Count every HTTP request
app.use((req, res, next) => {
    httpRequestCounter.inc();
    next();
});

// Serve Student Task Manager
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'stm.html'));
});

// Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
});

// Start server
app.listen(PORT, () => {
    console.log(`Student Task Manager running on port ${PORT}`);
});
