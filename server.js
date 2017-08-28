var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

server.listen(8081,function(){ // Listens to port 8081
    console.log('Listening on '+server.address().port);
});

var data = {
    'rooms': [
        [ ],
        [ ],
        [ ],
        [ ],
        [ ],
    ]
};


io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté ! ' + socket.id);

    setInterval(function(){
        socket.emit('update', data);
    },1000/5);

    let currentRoom;

    socket.on('join', function (room) {
        if(Object.keys(socket.rooms).length == 1){
            socket.join(room);
            data.rooms[room-1] = Object.keys(io.sockets.adapter.rooms[room].sockets);
            console.log('Le client ' + socket.id + ' a rejoin la room ' + room);
            socket.emit('update', data);
            currentRoom = room;
        }
    });

    socket.on('updatePlayer', function (data) {
        socket.broadcast.to(currentRoom).emit('updatePlayer', data);
    });

    socket.on('disconnect', function () {
        if(io.sockets.adapter.rooms[currentRoom] != undefined) {
            data.rooms[currentRoom-1] = Object.keys(io.sockets.adapter.rooms[currentRoom].sockets);
        } else {
            data.rooms[currentRoom-1] = [];
        }
        console.log('Le client ' + socket.id + ' a déco');
        socket.emit('update', data);
    });
});