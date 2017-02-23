/**
 * Created by bernard on 14/01/17.
 */

import Bloc from "./bloc";

export default class Brick extends Bloc {

    constructor(game, x, y, key, frame) {
        super(game, x, y, key, frame);
    }

    collide() {
        this.game.add.tween(this).to({
                y: this.body.y - 5
            }, 75, null, true, 0, 0, true
        ).onUpdateCallback(function(){
            console.log('time')
            this.game.physics.arcade.overlap(this, this.mushroom, function(brick, mushroom){
                mushroom.bump();
                console.log('ok');
            }, null, this);
        }, this);
    }
}