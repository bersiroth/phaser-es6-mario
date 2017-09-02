/**
 * Created by bernard on 01/09/17.
 */
class Room {

    constructor(roomId, capacity){
        this.roomId = roomId;
        this.capacity = capacity;
        this.players = [];
    }

    addPlayer(player){
        if(this.players.length < this.capacity){
            this.players.push(player);
            console.log('Le joueur ' + player.nickname + ' a rejoin la room ' + this.roomId);
            return true;
        } else {
            console.log('ERREUR : Le joueur ' + player.nickname + ' a voulu rejoindre la room ' + this.roomId + ' qui est pleine');
            console.log(this.players)
            return false;
        }
    }

    removePlayer(player){
        if(this.players.indexOf(player) != -1){
            this.players.splice(this.players.indexOf(player), 1);
            console.log('Le joueur ' + player.nickname + ' a quitte la room ' + player.roomId);
            return true;
        } else {
            console.log('ERREUR : Le joueur ' + player.nickname + ' a voulu quitte la room ' + player.roomId + ' alors qu\'il n\'ai pas dedans');
            return false;
        }
    }
}

module.exports.Room = Room;