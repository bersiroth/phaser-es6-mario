/**
 * Created by bernard on 01/09/17.
 */
var {Room} = require('./../entities/room');

class RoomManager {

    constructor(capacity, roomCapacity){
        this.capacity = capacity;
        this.rooms = [];
        for (let i = 0; i < this.capacity; i++){
            this.rooms.push(new Room(i + 1, roomCapacity));
        }
        this.players = 0;
    }

    getRoom(roomId) {
        return this.rooms[roomId-1];
    }

    leaveRoom(player) {
        if (player.roomId != null) {
            let room = this.getRoom(player.roomId);
            room.removePlayer(player);
            console.log(room);
            player.setRoomId(null);
            player.setReady(false);
        }
    }

    joinRoom(roomId, player) {
        let room = this.getRoom(roomId);
        room.addPlayer(player);
        player.setRoomId(roomId);
        player.setReady(false);
        console.log(this.getRoom(player.roomId));
    }

}

module.exports.RoomManager = RoomManager;