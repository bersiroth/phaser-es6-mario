/**
 * Created by bernard on 14/01/17.
 */

export default class Item extends Phaser.Sprite {

    constructor(game, x, y, key, frame, item) {
        super(game, x, y, key, frame);

        this.animations.add('spin', [24, 25, 26], 4, true);
        this.animations.play('spin');
        game.physics.arcade.enable(this);
        this.body.allowGravity = false;
        this.body.immovable = true;

        this.item = item;
    }

    collide() {
        this.animations.stop();
        this.frame = 27;

        this.item.tween();

        this.game.add.tween(this).to({
            y: this.body.y - 5
        }, 125, null, true, 0, 0, true);
    }
}