/**
 * Created by bernard on 14/01/17.
 */

import ItemBloc from "./../blocs/item";

export default class Item extends Phaser.Sprite {

    constructor(game, x, y, key, frame) {
        super(game, x, y, key, frame);

        game.physics.arcade.enable(this);
        this.body.allowGravity = false;

        let group = this.game.world.getByName('itemblocs');
        this.bloc = new ItemBloc(this.game, x ,y - 16, 'world', 24, this);

        group.add(this.bloc);
    }

    tween() {

    }
}