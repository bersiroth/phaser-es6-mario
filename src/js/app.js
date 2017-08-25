import {Game} from "game";

var game = new Game('mario');
game.start();

var socket = io('http://192.168.99.100:8081');
socket.on('connect', function(){
    console.log('Je suis co !');
});

socket.on('message', function(message) {
    console.log('Message du serveur pour vous : ' + message);
});

socket.on('nouveau', function(message) {
    console.log('Message global du serveur : ' + message);
});

socket.emit('message', 'Salut serveur, ça va ?');

window.onbeforeunload = function(){
    socket.emit('disconnect', function(){
        console.log('je viens de me co !');
    });
};