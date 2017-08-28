
export class Menu extends Phaser.State {

    create() {
        this.game.stage.backgroundColor = '#6f85ff';

        let nintendo = this.game.add.sprite(this.game.world.centerX, 25, 'menu');
        nintendo.anchor.x = 0.5;

        let text5 = this.add.bitmapText(this.game.world.centerX, 120, 'plumber_bros', 'By Bersiroth', 8);
        text5.tint = 0xf9c3be;

        let singlePlayer = this.add.bitmapText(this.game.world.centerX, 150, 'plumber_bros', 'SINGLE-PLAYER', 12);
        singlePlayer.anchor.set(0.5);
        singlePlayer.inputEnabled = true;
        singlePlayer.events.onInputDown.add(() => {
            this.state.start('World1-Level1');
        });
        singlePlayer.events.onInputOver.add((text) => {
            text.tint = 0xFFBB00;
        });
        singlePlayer.events.onInputOut.add((text) => {
            text.tint = 0xFFFFFF;
        });

        let multiplayer = this.add.bitmapText(this.game.world.centerX, 170, 'plumber_bros', 'MULTI-PLAYER', 12);
        multiplayer.anchor.set(0.5);
        multiplayer.inputEnabled = true;
        multiplayer.events.onInputDown.add(() => {
            this.game.network.connect();
            this.state.start('Multi');
        });
        multiplayer.events.onInputOver.add((text) => {
            text.tint = 0xFFBB00;
        });
        multiplayer.events.onInputOut.add((text) => {
            text.tint = 0xFFFFFF;
        });

        let options = this.add.bitmapText(this.game.world.centerX, 190, 'plumber_bros', 'OPTIONS', 12);
        options.anchor.set(0.5);

        let credit = this.add.bitmapText(this.game.world.centerX, 210, 'plumber_bros', 'CREDIT', 12);
        credit.anchor.set(0.5);
    }


}