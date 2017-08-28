
export class ConnexionError extends Phaser.State {

    create() {
        this.game.stage.backgroundColor = '#6f85ff';

        let nintendo = this.game.add.sprite(this.game.world.centerX, 25, 'menu');
        nintendo.anchor.x = 0.5;

        let text5 = this.add.bitmapText(this.game.world.centerX, 120, 'plumber_bros', 'By Bersiroth', 8);
        text5.tint = 0xf9c3be;

        let error = this.game.add.bitmapText(this.game.world.centerX, 180, 'plumber_bros', 'Erreur de connexion', 12);
        error.anchor.set(0.5)
        error.tint = 0xE92D27;

        let back = this.game.add.bitmapText(this.game.world.centerX*1.4, 230, 'plumber_bros', 'RETOUR', 12);
        back.anchor.set(0.5);
        back.inputEnabled = true;

        back.events.onInputDown.add(function(){
            this.game.state.start('Menu');
        }, this);
        back.events.onInputOver.add(function(text){
            text.tint = 0xFFBB00;
        }, this);
        back.events.onInputOut.add(function(text){
            text.tint = 0xFFFFFF;
        }, this);
    }


}