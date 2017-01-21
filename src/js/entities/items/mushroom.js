/**
 * Created by bernard on 14/01/17.
 */

import Item from "./item";

export default class Mushroom extends Item {

    constructor(game, x, y, key, frame) {
        super(game, x, y, key, frame);
    }

    tween(){
        let itemSpawn = this.game.add.tween(this).to({
            y: this.body.y - 16
        }, 400, null, true, 0, 0, false);

        itemSpawn.onComplete.add(function() {
            this.body.allowGravity = true;
            this.body.velocity.x = 40;
        }, this);
    }

    update() {
        if(this.lastVelocity != 0 && this.body.velocity.x == 0){
            this.body.velocity.x = -this.lastVelocity;
        }
        this.lastVelocity = this.body.velocity.x;
    }


}