var express = require('express');
var app = express();
var path = require('path');
// app.configure is no longer part of express in:
// express 4 
// https://github.com/expressjs/express/wiki/Migrating-from-3.x-to-4.x
app.use('/js', express.static(__dirname + '/js'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/', express.static(__dirname + '/'));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});



app.listen(8080);