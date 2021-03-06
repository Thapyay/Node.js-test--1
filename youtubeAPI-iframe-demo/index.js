const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

http.listen(port, function() {
    console.log(`Listening on port : ${port}`);
});

io.sockets.on('connection', function(socket) {
    console.log('A new client connected');

    socket.broadcast.on('setPlay', function(data){
        io.emit('setPlay', data);
    });

    socket.broadcast.on('setPause', function(data){
        io.emit('setPause', data);
    });
});