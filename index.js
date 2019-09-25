var app = require('express')();

var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3245;
var express = require("express");


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});
app.use(express.static('public'));

// user connects message with user name seperated with colon
io.on('connection', function(socket) {
    socket.on('user', function(info) {
        socket.broadcast.emit('user', info + ' joined');
        socket.on('chat message', function(msg) {
            if (msg !== "") {
                io.emit('chat message', info + ": " + msg);
            }
        });

    });


});


http.listen(port, function() {
    console.log('listening on *:' + port);
});