
export class Menu extends Phaser.State {

    preload() {
    }

    create() {

        this.game.stage.backgroundColor = '#6f85ff';

        let nintendo = this.game.add.sprite(this.game.world.centerX, 25, 'menu');
        nintendo.anchor.x = 0.5;

        let text5 = this.add.bitmapText(this.game.world.centerX, 120, 'plumber_bros', 'By Bersiroth', 8);
        text5.tint = 0xf9c3be;

        this.text = this.add.bitmapText(this.game.world.centerX, 150, 'plumber_bros', 'SINGLE-PLAYER', 12);
        this.text.anchor.set(0.5);
        this.text.inputEnabled = true;

        let text2 = this.add.bitmapText(this.game.world.centerX, 170, 'plumber_bros', 'MULTI-PLAYER', 12);
        text2.anchor.set(0.5);

        let text3 = this.add.bitmapText(this.game.world.centerX, 190, 'plumber_bros', 'OPTIONS', 12);
        text3.anchor.set(0.5);

        let text4 = this.add.bitmapText(this.game.world.centerX, 210, 'plumber_bros', 'CREDIT', 12);
        text4.anchor.set(0.5);
    }

    update() {
        this.text.events.onInputDown.add(function(){
            this.state.start('World1-Level1');
        }, this);
        this.text.events.onInputOver.add(function(){
            this.text.tint = 0xFFBB00;
        }, this);
        this.text.events.onInputOut.add(function(){
            this.text.tint = 0xFFFFFF;
        }, this);
    }

}