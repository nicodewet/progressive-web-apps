'use strict';

const express = require('express');
const path = require('path');

// Constants
const PORT = 8080;

// App
// app.configure is no longer part of express in:
// express 4 
// https://github.com/expressjs/express/wiki/Migrating-from-3.x-to-4.x
const app = express();
app.use('/js', express.static(__dirname + '/js'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/data', express.static(__dirname + '/data'));
app.use('/', express.static(__dirname + '/'));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.listen(PORT);
console.log(`Running on ${PORT} (check our OS mapped port if running on bridge network with Docker)`);