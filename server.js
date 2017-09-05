var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

var {Player} = require('./server/entities/player');
var {RoomManager} = require('./server/managers/roomManager');

server.listen(8081,function(){ // Listens to port 8081
    console.log('Listening on '+server.address().port);
});

var roomManager = new RoomManager(5, 2);
console.log(roomManager);

io.sockets.on('connection',(socket) => {
    var player = new Player(socket.id, socket.handshake.query.nickname);
    roomManager.players += 1;
    console.log('Un joueur est connecté : ' + player.nickname);

    var intervalCount = 0;
    setInterval(function(){
        socket.emit('update', roomManager);
        if (intervalCount % 10 == 0 && player.roomId != null) {
            console.log('Room manager : ');
            console.log(roomManager.getRoom(player.roomId));
        }
        intervalCount++;
    },1000/5);

    socket.on('join',(roomId) => {
        if(Object.keys(socket.rooms).length == 1){
            socket.join(roomId);
            roomManager.joinRoom(roomId, player);
            socket.emit('update', roomManager);
            socket.broadcast.to(player.roomId).emit('newPlayer', player.nickname);
        }
    });

    socket.on('leave',() => {
        if(Object.keys(socket.rooms).length > 1){
            let roomId = player.roomId;
            socket.leave(roomId);
            roomManager.leaveRoom(player);
            socket.emit('update', roomManager);
            socket.broadcast.to(roomId).emit('disconnetedPlayer');
        }
    });

    socket.on('ready',(ready) => {
        player.setReady(ready);
        socket.emit('update', roomManager);
        console.log(roomManager.getRoom(player.roomId));
    });

    socket.on('updatePlayer',(data) => {
        player.update(data);
        socket.broadcast.to(player.roomId).emit('updatePlayer', data);
    });

    socket.on('disconnect',() => {
        roomManager.players -= 1;
        roomManager.leaveRoom(player);
        socket.emit('update', roomManager);
        console.log('Le joueur ' + player.nickname + ' a déco');
    });
});