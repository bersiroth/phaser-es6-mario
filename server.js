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
    ],
    'players' : 0
};

io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté ! ' + socket.id);

    setInterval(function(){
        data.players = Object.keys(io.sockets.sockets).length;
        socket.emit('update', data);
    },1000/5);

    let currentRoom;

    socket.on('join', function (room) {
        if(Object.keys(socket.rooms).length == 1){
            socket.join(room);
            currentRoom = room;
            updateRoom(currentRoom);
            console.log('Le client ' + socket.id + ' a rejoin la room ' + room);
            socket.broadcast.to(currentRoom).emit('newPlayer', 'Moi 2');
            socket.broadcast.to(currentRoom).emit('updatePlayer', data);
        }
    });

    socket.on('leave', function (room) {
        if(Object.keys(socket.rooms).length > 1){
            socket.leave(room);
            updateRoom(currentRoom);
            console.log('Le client ' + socket.id + ' a quitte la room ' + room);
            socket.broadcast.to(currentRoom).emit('updatePlayer', data);
            currentRoom = null;
        }
    });

    socket.on('updatePlayer', function (data) {
        socket.broadcast.to(currentRoom).emit('updatePlayer', data);
    });

    socket.on('disconnect', function () {
        if (currentRoom != null) {
            updateRoom(currentRoom);
        }
        console.log('Le client ' + socket.id + ' a déco');
        socket.emit('update', data);
    });
});

function updateRoom(currentRoom) {
    if(io.sockets.adapter.rooms[currentRoom] != undefined) {
        data.rooms[currentRoom-1] = Object.keys(io.sockets.adapter.rooms[currentRoom].sockets);
    } else {
        data.rooms[currentRoom-1] = [];
    }
    console.log('UpdateRoom room : ' + currentRoom);
}