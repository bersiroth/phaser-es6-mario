
export class Waiting extends Phaser.State {

    create() {
        this.game.stage.backgroundColor = '#6f85ff';

        let nintendo = this.game.add.sprite(this.game.world.centerX, 15, 'menu');
        nintendo.anchor.x = 0.5;

        let text5 = this.add.bitmapText(this.game.world.centerX, 110, 'plumber_bros', 'By Bersiroth', 8);
        text5.tint = 0xf9c3be;

        let actualRoom = this.add.bitmapText(this.game.world.centerX, 132, 'plumber_bros', 'Server ' + this.game.network.actualRoom, 8);
        actualRoom.anchor.set(0.5);

        this.actualPlayer = this.add.bitmapText(this.game.world.centerX, 145, 'plumber_bros', 'Player ' + this.game.network.getNbPlayerInMyRoom() + ' / ' + this.game.network.getActualRoom().capacity, 8);
        this.actualPlayer.anchor.set(0.5);

        this.player1 = this.add.bitmapText(15, 160, 'plumber_bros', '', 8);
        this.player1Ready = this.add.bitmapText(185, 160, 'plumber_bros', 'Ready', 8);

        this.player2 = this.add.bitmapText(15, 173, 'plumber_bros', 'Player 2 :', 8);
        this.player2Ready = this.add.bitmapText(185, 173, 'plumber_bros', '', 8);

        this.loader = this.add.sprite(50, 200, 'loader-small');
        this.loader.animations.add('turn');
        this.loader.animations.play('turn', 15, true);
        this.loader.anchor.set(0.5);

        this.loaderMessage = this.add.bitmapText(this.game.world.centerX + 8, 200, 'plumber_bros', 'Waiting player', 8);
        this.loaderMessage.anchor.set(0.5);

        this.launch = this.add.bitmapText(this.game.world.centerX, 200, 'plumber_bros', 'Game start in 5s !', 8);
        this.launch.anchor.set(0.5);
        this.launch.visible = false;

        if (this.game.network.getNbPlayerInMyRoom() < this.game.network.getActualRoom().capacity) {
            this.game.network.position = 1;

            this.player1.text = 'Player 1 : ' + this.game.network.nickname;

            this.player1Ready.tint = 0xE92D27;
            this.player1Ready.inputEnabled = true;
            this.player1Ready.events.onInputDown.add((text) => {
                this.game.network.setReady();
                text.tint = 0x27E92D;
            });
            this.player1Ready.events.onInputUp.add((text) => {
                text.tint = 0xFFBB00;
            });
            this.player1Ready.events.onInputOver.add((text) => {
                text.tint = 0xFFBB00;
            });
            this.player1Ready.events.onInputOut.add((text) => {
                text.tint = !this.game.network.ready ? 0xE92D27 : 0x27E92D;
            });

            this.waitPlayer();

        } else {
            this.game.network.position = 2;

            this.player1.text = 'Player 1 : ' + this.game.network.getSecondPlayerInMyRoom().nickname;
            this.player2.text = 'Player 2 : ' + this.game.network.nickname;
            this.player2Ready.text = 'Ready';

            this.player2Ready.tint = 0xE92D27;
            this.player2Ready.inputEnabled = true;
            this.player2Ready.events.onInputDown.add((text) => {
                this.game.network.setReady();
                text.tint = 0x27E92D;
            });
            this.player2Ready.events.onInputUp.add((text) => {
                text.tint = 0xFFBB00;
            });
            this.player2Ready.events.onInputOver.add((text) => {
                text.tint = 0xFFBB00;
            });
            this.player2Ready.events.onInputOut.add((text) => {
                text.tint = !this.game.network.ready ? 0xE92D27 : 0x27E92D;
            });

            this.waitReady();
        }

        this.game.network.socket.on('newPlayer', (nickname) => {

            let pos = this.game.network.position;
            let secondPlayer = pos == 1 ? this.player2 : this.player1;
            secondPlayer.text = 'Player ' + (pos == 1 ? '2' : '1')  + ' : ' + nickname;
            let secondPlayerReady = pos == 1 ? this.player2Ready : this.player1Ready;
            secondPlayerReady.text = 'Ready';

            this.game.network.setReady(false);
            let playerReady = pos == 1 ? this.player1Ready : this.player2Ready;
            playerReady.tint = 0xE92D27;
            this.waitReady();
        });
        this.game.network.socket.on('disconnetedPlayer', () => {

            let pos = this.game.network.position;
            let secondPlayer = pos == 1 ? this.player2 : this.player1;
            secondPlayer.text = 'Player ' + (pos == 1 ? '2' : '1') + ' : ';
            let secondPlayerReady = pos == 1 ? this.player2Ready : this.player1Ready;
            secondPlayerReady.text = '';

            this.game.network.setReady(false);
            let playerReady = pos == 1 ? this.player1Ready : this.player2Ready;
            playerReady.tint = 0xE92D27;
            this.waitPlayer();
        });

        let back = this.add.bitmapText(this.game.world.centerX * 1.4, 230, 'plumber_bros', 'RETURN', 12);
        back.anchor.set(0.5);
        back.inputEnabled = true;

        back.events.onInputDown.add(() => {
            clearTimeout(this.timer);
            clearInterval(this.timerText);
            this.game.network.setReady(false);
            this.game.network.leaveRoom(this.game.network.actualRoom);
            this.state.start('List');
        });
        back.events.onInputOver.add((text) => {
            text.tint = 0xFFBB00;
        });
        back.events.onInputOut.add((text) => {
            text.tint = 0xFFFFFF;
        });
    }


    waitPlayer() {
        clearTimeout(this.timer);
        clearInterval(this.timerText);
        this.game.network.gameStart = false;
        this.launch.visible = false;
        this.loaderMessage.text = 'Waiting player';
        this.loaderMessage.visible = true;
        this.loader.visible = true;
    }

    waitReady() {
        clearTimeout(this.timer);
        clearInterval(this.timerText);
        this.game.network.gameStart = false;
        this.loader.visible = false;
        this.loaderMessage.visible = false;
        this.launch.text = 'Wait all players are ready !';
        this.launch.visible = true;
    }

    launchGame() {
        if (this.game.network.roomIsReady()) {
            clearTimeout(this.timer);
            clearInterval(this.timerText);
            this.loader.visible = false;
            this.loaderMessage.visible = false;
            this.game.network.gameStart = true;
            this.launch.visible = true;
            let delay = 5;
            this.timerText = setInterval ( () => {
                delay -= 1;
                this.launch.text = 'Game start in ' + delay  + 's !'
            }, 1000 );
            this.timer = setTimeout(() => {
                this.state.start('World1-Level1');
            }, 5000);
        }
    }

    update() {
        this.actualPlayer.text = 'Players ' + this.game.network.getNbPlayerInMyRoom() + ' / ' + this.game.network.getActualRoom().capacity;

        if (this.game.network.getSecondPlayerInMyRoom() != false) {
            let secondPlayer = this.game.network.position == 1 ? this.player2Ready : this.player1Ready;
            secondPlayer.tint = this.game.network.getSecondPlayerInMyRoom().ready ? 0x27E92D : 0xE92D27;

            if (this.game.network.getSecondPlayerInMyRoom().ready && this.game.network.ready) {
                if (!this.game.network.gameStart) {
                    this.launchGame();
                }
            } else {
                this.waitReady();
            }
        } else {
            this.waitPlayer();
        }
    }
}