/**
 * Created by bernard on 01/09/17.
 */
class Player {

    constructor(id, nickname){
        this.id = id;
        this.nickname = nickname;

        this.roomId;
        this.ready = false;
    }

    setRoomId(roomId){
        this.roomId = roomId;
    }

    setReady(ready){
        this.ready = ready;
        console.log('Le joueur ' + this.nickname + ' est ' + (this.ready ? 'pret' : 'pas pret'));
    }
}

module.exports.Player = Player;