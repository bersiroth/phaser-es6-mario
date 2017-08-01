/**
 * Created by bernard on 01/08/17.
 */
import Const from 'const';
import Entity from "./entity";

export default class koopa extends Entity {

    constructor(game, x, y, key, frame) {
        super(game, x, y, key, frame);

        // this.smoothed = true;
        this.animations.add('walk', [4,5], 4, true);
        game.physics.arcade.enable(this);

        this.moved = false;
    }

    move() {
        // this.animations.play('walk');
        this.body.velocity.x = -1 ;
        this.moved = true;
    }

    update() {
        if(this.lastVelocity != 0 && this.body.velocity.x == 0 && this.frame != 2){
            this.turnAround();
        }
        this.lastVelocity = this.body.velocity.x;
    }

    turnAround() {
        this.body.velocity.x = -this.lastVelocity;
    }

    die() {
        this.animations.stop();
        this.body.velocity.x = 0;
        this.frame = 4;
        // this.game.time.events.add(200, function(){
        //     this.destroy();
        // }, this);

        this.game.score += 100;
    }
}