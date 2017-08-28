
export class Multi extends Phaser.State {

    create() {
        this.game.stage.backgroundColor = '#6f85ff';

        let nintendo = this.game.add.sprite(this.game.world.centerX, 25, 'menu');
        nintendo.anchor.x = 0.5;

        let text5 = this.add.bitmapText(this.game.world.centerX, 120, 'plumber_bros', 'By Bersiroth', 8);
        text5.tint = 0xf9c3be;

        this.loader = this.add.sprite(this.game.world.centerX, 160, 'loader');
        this.loader.animations.add('turn');
        this.loader.animations.play('turn', 15, true);
        this.loader.anchor.set(0.5);

        this.loaderMessage = this.add.bitmapText(this.game.world.centerX, 200, 'plumber_bros', 'Connexion au serveur', 9);
        this.loaderMessage.anchor.set(0.5);

        this.rooms = [];
        for (var i = 0; i < 5; i++) {
            this.rooms[i] = this.add.bitmapText(this.game.world.centerX, 145 + (i * 16), 'plumber_bros', 'testt', 8);
            this.rooms[i].visible = false;
            this.rooms[i].anchor.set(0.5);
            this.rooms[i].inputEnabled = true;

            this.rooms[i].events.onInputDown.add((text) => {
                this.game.network.joinRoom(text.renderOrderID-1);
                this.game.state.start('World1-Level1');
            });
            this.rooms[i].events.onInputOver.add((text) => {
                text.tint = 0xFFBB00;
            });
            this.rooms[i].events.onInputOut.add((text) => {
                text.tint = 0xFFFFFF;
            });
        }

        let back = this.add.bitmapText(this.game.world.centerX*1.4, 230, 'plumber_bros', 'RETOUR', 12);
        back.anchor.set(0.5);
        back.inputEnabled = true;

        back.events.onInputDown.add(() => {
            this.state.start('Menu');
        });
        back.events.onInputOver.add((text)  => {
            text.tint = 0xFFBB00;
        });
        back.events.onInputOut.add((text)  => {
            text.tint = 0xFFFFFF;
        });
    }

    update() {
        if (this.game.network.rooms != undefined){
            this.loader.visible = false;
            this.loaderMessage.visible = false;

            this.game.network.rooms.forEach((room, index) => {
                this.rooms[index].text = 'server ' + (index + 1) + ' : ' + room.length + ' / 2';
                this.rooms[index].visible = true;
            });

        }
    }
}