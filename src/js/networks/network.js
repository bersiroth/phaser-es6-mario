/**
 * Created by bernard on 27/08/17.
 */

export default class Network {

    constructor(game) {
        this.game = game;
        this.socket;

        this.nickname;

        this.ready = false;
        this.gameStart = false;
    }

    connect() {
        if( this.socket != null && this.socket.id != undefined ) {
            return true;
        }

        try{
            this.socket = io.connect('http://172.17.0.2:8081?nickname='+this.nickname, {
                reconnection: false
            });

            this.socket.on('connect_error',() => {
                this.game.state.start('ConnexionError');
            })

            this.socket.on('update', (data) => {
                this.rooms = data.rooms;
                this.players = data.players;
            })
        }catch(e){
            console.log(e);
        }
    }

    joinRoom(name) {
        this.actualRoom = name;
        this.socket.emit('join', name);
    }

    leaveRoom(name) {
        this.actualRoom = null;
        this.socket.emit('leave', name);
    }

    setReady(ready = null) {
        this.ready = ready == null ? !this.ready : ready;
        this.socket.emit('ready', this.ready);
    }

    roomIsReady() {
        let room = this.getActualRoom();
        let ready = true;

        room.players.forEach((player) => {
            if(player.ready == false){
                ready = false;
            }
        });

        return ready;
    }

    getActualRoom() {
        if (this.actualRoom != null) {
            let players = this.rooms[this.actualRoom-1].players;
            let updated = false;
            for(let i = 0; i < players.length; i++){
                if (players[i].nickname == this.nickname){
                    updated = true;
                }
            }
            return (updated) ? this.rooms[this.actualRoom-1] : false;
        } else {
            return false;
        }
    }

    getNbPlayerInMyRoom() {
        let room = this.getActualRoom();
        if (room != false) {
            return room.players.length;
        } else {
            return false;
        }
    }

    getSecondPlayerInMyRoom() {
        let players = this.getNbPlayerInMyRoom();
        if (players != false && players > 1) {
            return this.getActualRoom().players[(this.position == 2) ? 0 : 1];
        } else {
            return false;
        }
    }

    disconnect() {
        this.socket.disconnect();
        this.socket = null;
    }
}