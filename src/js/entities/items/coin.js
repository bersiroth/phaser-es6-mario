/**
 * Created by bernard on 14/01/17.
 */

import Item from "./item";

export default class Coin extends Item {

    constructor(game, x, y, key, frame) {
        super(game, x, y, key, frame);
        this.animations.add('go', [252, 253, 254, 255], 12, true);
        this.coin = this.game.add.audio('coin');
        this.coin.volume = 0.3;
    }

    tween(){
        this.animations.play('go');
        this.coin.play();
        this.game.add.tween(this).to({
            y: this.body.y - 50
        }, 200, null, true, 0, 0, true);
    }


}