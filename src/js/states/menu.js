
export class Menu extends Phaser.State {

    create() {
        this.game.stage.disableVisibilityChange = false;
        this.game.stage.backgroundColor = '#6f85ff';

        let nintendo = this.game.add.sprite(this.game.world.centerX, 15, 'menu');
        nintendo.anchor.x = 0.5;

        let text5 = this.add.bitmapText(this.game.world.centerX, 110, 'plumber_bros', 'By Bersiroth', 8);
        text5.tint = 0xf9c3be;

        let singlePlayer = this.add.bitmapText(this.game.world.centerX, 140, 'plumber_bros', 'SINGLE-PLAYER', 12);
        singlePlayer.anchor.set(0.5);
        singlePlayer.inputEnabled = true;
        singlePlayer.events.onInputDown.add(() => {
            if(this.game.network.socket != undefined) {
                this.game.network.disconnect();
            }
            this.state.start('World1-Level1');
        });
        singlePlayer.events.onInputOver.add((text) => {
            text.tint = 0xFFBB00;
        });
        singlePlayer.events.onInputOut.add((text) => {
            text.tint = 0xFFFFFF;
        });

        let multiplayer = this.add.bitmapText(this.game.world.centerX, 160, 'plumber_bros', 'MULTI-PLAYER', 12);
        multiplayer.anchor.set(0.5);
        multiplayer.inputEnabled = true;
        multiplayer.events.onInputDown.add(() => {
            let defaultNickname = (this.game.network.nickname == null) ? 'Bersiroth' : this.game.network.nickname;
            let nickname = prompt("Please enter your nickname (9 characters max)", defaultNickname);
            if (nickname != null && nickname.length <= 9){
                this.game.network.nickname = nickname;
                this.game.network.connect();
                this.state.start('List');
            } else if (nickname.length > 9) {
                alert("Your nickname must have 9 characters max");
            }
        });
        multiplayer.events.onInputOver.add((text) => {
            text.tint = 0xFFBB00;
        });
        multiplayer.events.onInputOut.add((text) => {
            text.tint = 0xFFFFFF;
        });

        let options = this.add.bitmapText(this.game.world.centerX, 180, 'plumber_bros', 'OPTIONS', 12);
        options.anchor.set(0.5);

        let credit = this.add.bitmapText(this.game.world.centerX, 200, 'plumber_bros', 'CREDIT', 12);
        credit.anchor.set(0.5);
    }


}