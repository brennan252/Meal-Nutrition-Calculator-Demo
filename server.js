// "server.js"
// Serve Static Path and Endpoints for GET 'names' and GET 'mealdata'
'use strict';

const path = require('path');
const express = require('express');


// staticBundle
const staticPath = path.join(__dirname, '/');
const app = express();
app.use(express.static(staticPath));


// Allows you to set port in the project properties.
app.set('port', process.env.PORT || 3000);


const server = app.listen(app.get('port'), function () {
    console.log('listening');
});

