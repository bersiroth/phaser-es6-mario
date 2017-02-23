/**
 * Created by bernard on 14/01/17.
 */

export default class Entity extends Phaser.Sprite {

    constructor(game, x, y, key, frame) {
        super(game, x, y, key, frame);

        this.coins      = this.game.world.getByName('coins');
        this.bricks     = this.game.world.getByName('bricks');
        this.itemblocs  = this.game.world.getByName('itemblocs');
        this.mushroom   = this.game.world.getByName('mushroom');
    }
}
