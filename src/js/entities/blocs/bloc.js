/**
 * Created by bernard on 23/02/17.
 */

import Entity from "./../entity";

export default class Bloc extends Entity {

    constructor(game, x, y, key, frame) {
        super(game, x, y, key, frame);

        game.physics.arcade.enable(this);
        this.body.allowGravity = false;
        this.body.immovable = true;

        this.bump = this.game.add.audio('bump');;
        this.bump.volume = 0.8;
    }

    tween() {}

    collide() {}
}