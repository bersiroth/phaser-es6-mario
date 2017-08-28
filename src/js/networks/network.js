/**
 * Created by bernard on 27/08/17.
 */

export default class Network {

    constructor(game) {
        this.game = game;
        this.socket = null;
    }

    connect() {
        if( this.socket != null && this.socket.id != undefined ) {
            return true;
        }

        try{
            this.socket = io.connect('http://89.157.223.253:8081', {
                reconnection: false
            });

            this.socket.on('connect_error',() => {
                this.game.state.start('ConnexionError');
            })

            this.socket.on('update', (data) => {
                this.rooms = data.rooms;
            })
        }catch(e){
            console.log(e);
        }
    }

    joinRoom(name) {
        this.socket.emit('join', name);
    }
}