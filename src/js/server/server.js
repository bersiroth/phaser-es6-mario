var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

server.listen(8081,function(){ // Listens to port 8081
    console.log('Listening on '+server.address().port);
});

io.sockets.on('connection', function (socket) {
    console.log('\nUn client est connecté ! ' + socket.id);

    socket.emit('message', 'Vous êtes bien connecté !');
    socket.emit('message', 'Bonjour :)');

    socket.broadcast.emit('nouveau', "un nouveau client vient d'arriver !");

    socket.on('message', function (message) {
        console.log('Message du client (' + socket.id + ') : ' + message);
    });

    socket.on('disconnect', function () {
        console.log('Un client est déconnecté ! ' + socket.id);
    });
});
