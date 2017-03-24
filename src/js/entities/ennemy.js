/**
 * Created by bernard on 12/03/17.
 */
import Const from 'const';
import Entity from "./entity";

export default class Ennemy extends Entity {

    constructor(game, x, y, key, frame) {
        super(game, x, y, key, frame);

        this.smoothed = true;
        this.animations.add('walk', [0, 1], 4, true);
        game.physics.arcade.enable(this);

        this.moved = false;
    }

    move() {
        this.animations.play('walk');
        this.body.velocity.x = -Const.ENNEMY_SPEED;
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
        this.frame = 2;
        this.game.time.events.add(200, function(){
            this.destroy();
        }, this);

        this.game.score += 100;
    }
}