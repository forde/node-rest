const express = require('express');
const app = express();

// Middleware
app.use((request, response, next) => {
    // send back json with status code 200 for every request
    response.status(200).json({
        message: 'It works!'
    });
});

module.exports = app;