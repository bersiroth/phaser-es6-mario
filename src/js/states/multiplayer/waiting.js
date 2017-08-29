
export class Waiting extends Phaser.State {

    create() {
        this.game.stage.backgroundColor = '#6f85ff';

        let nintendo = this.game.add.sprite(this.game.world.centerX, 25, 'menu');
        nintendo.anchor.x = 0.5;

        let text5 = this.add.bitmapText(this.game.world.centerX, 120, 'plumber_bros', 'By Bersiroth', 8);
        text5.tint = 0xf9c3be;

        let actuelRoom = this.add.bitmapText(this.game.world.centerX, 140, 'plumber_bros', 'Server : ' + this.game.network.currentRoom, 8);
        actuelRoom.anchor.set(0.5);

        this.actuelPlayer = this.add.bitmapText(this.game.world.centerX, 155, 'plumber_bros', 'Joueurs : ' + this.game.network.getMyRoom().length + ' / 2', 8);
        this.actuelPlayer.anchor.set(0.5);

        this.player1 = this.add.bitmapText(60, 172, 'plumber_bros', 'Joueurs 1 : Moi', 8);
        this.player2 = this.add.bitmapText(60, 182, 'plumber_bros', 'Joueurs 2 : ', 8);

        this.launch = this.add.bitmapText(this.game.world.centerX, 210, 'plumber_bros', 'Debut de la partie dans 5s !', 8);
        this.launch.anchor.set(0.5);
        this.launch.visible = false;

        if (this.game.network.getMyRoom().length < 1) {

            let loader = this.add.sprite(30, 210, 'loader-small');
            loader.animations.add('turn');
            loader.animations.play('turn', 15, true);
            loader.anchor.set(0.5);

            let loaderMessage = this.add.bitmapText(this.game.world.centerX + 8, 210, 'plumber_bros', 'En attente de joueur', 8);
            loaderMessage.anchor.set(0.5);

            this.game.network.socket.on('newPlayer', (pseudo) => {
                loader.visible = false;
                loaderMessage.visible = false;
                this.actuelPlayer.text = 'Joueurs : 2 / 2';
                this.player2.text = 'Joueurs 2 : ' + pseudo;
                this.launchGame();
            });
        } else {
            this.player2.text = 'Joueurs 2 : Moi 2';
            this.launch.visible = true;
            this.launchGame();
        }

        let back = this.add.bitmapText(this.game.world.centerX * 1.4, 230, 'plumber_bros', 'RETOUR', 12);
        back.anchor.set(0.5);
        back.inputEnabled = true;

        back.events.onInputDown.add(() => {
            this.game.network.leaveRoom(this.game.network.currentRoom);
            this.state.start('List');
        });
        back.events.onInputOver.add((text) => {
            text.tint = 0xFFBB00;
        });
        back.events.onInputOut.add((text) => {
            text.tint = 0xFFFFFF;
        });
    }

    launchGame() {
        this.launch.visible = true;
        let delay = 5;
        setInterval ( () => {
            delay -= 1;
            this.launch.text = 'Debut de la partie dans ' + delay  + 's !'
        }, 1000 );
        setTimeout(() => {
            this.state.start('World1-Level1');
        }, 5000);
    }

    update() {
        this.actuelPlayer.text = 'Joueurs : ' + this.game.network.getMyRoom().length + ' / 2';
    }
}