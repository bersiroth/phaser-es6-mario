/**
 * Created by bernard on 14/01/17.
 */

import Item from "./item";

export default class Mushroom extends Item {

    constructor(game, x, y, key, frame) {
        super(game, x, y, key, frame);
        this.appear = this.game.add.audio('powerup-appears');
    }

    tween(){
        this.appear.play();

        let itemSpawn = this.game.add.tween(this).to({
            y: this.body.y - 15
        }, 400, null, true, 0, 0, false);

        itemSpawn.onComplete.add(function() {
            this.body.allowGravity = true;
            this.body.velocity.x = 40;
        }, this);
    }

    update() {
        if(this.lastVelocity != 0 && this.body.velocity.x == 0){
            this.turnAround();
        }
        this.lastVelocity = this.body.velocity.x;
    }

    turnAround() {
        this.body.velocity.x = -this.lastVelocity;
    }

    bump() {
        this.body.velocity.y -= 200;
        this.turnAround();
    }

}