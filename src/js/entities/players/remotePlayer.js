/**
 * Created by bernard on 04/09/17.
 */

import Player from "./player";

export default class RemotePlayer extends Player {

    constructor(game, x, y, key, frame) {
        super(game, x, y, key, frame);

        this.textureBig = 'luigi-big';
        this.textureSmall = 'luigi-small';
        this.previousPower = false;
    }

    update() {
        super.update();

        console.log(this.invulnerable)
        if (!this.previousPower && this.power) {
            this.power = false;
            this.powerup();
            this.previousPower = true;
        }
        if (this.previousPower && !this.power) {
            this.power = true;
            this.powerDown();
            this.previousPower = false;
        }

        this.game.physics.arcade.overlap(this, this.ennemies);
        this.game.physics.arcade.collide(this, this.itemblocs);
        this.game.physics.arcade.overlap(this, this.mushroom);
        this.game.physics.arcade.collide(this, this.bricks);
    }
}