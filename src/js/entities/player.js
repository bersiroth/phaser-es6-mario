/**
 * Created by bernard on 14/01/17.
 */
import Const from 'const';

export default class Player extends Phaser.Sprite {

    constructor(game, x, y, key, frame) {
        super(game, x, y, key, frame);

        this.face = Phaser.LEFT;
        this.smoothed = true;
        this.animations.add('walk', [1, 2, 3], 8, true);
        game.physics.arcade.enable(this);
        this.body.drag.set(Const.DRAG,0);
        this.body.collideWorldBounds = false;
        this.body.maxVelocity.set(Const.MAX_SPEED, 80);
        this.anchor.setTo(.5,.5);
        this.body.setSize(this.body.width,this.body.height);
        this.scale.x = 1;
        this.canJump = true;

        this.cursors = game.input.keyboard.createCursorKeys();
    }

    update() {
        this._run();
        this._move();
        this._jump();
        this._flip();
    }

    up() {
        this.loadTexture('mario-big', 0, false);
        this.body.setSize(this.body.width +1 ,this.body.height * 2);
    }

    _run() {
        this.animations.currentAnim.delay = Math.min(200, 10000/Math.abs(this.body.velocity.x));

        let acceMax = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT).isDown ? Const.MAX_SPEED_SPRINT : Const.MAX_SPEED;
        if (this.body.velocity.x > acceMax) {
            acceMax = this.body.velocity.x * 0.99;
        }
        this.body.maxVelocity.set(acceMax, Const.MAX_SPEED * 10);
    }

    _move() {
        if (this.cursors.right.isDown) {
            this.body.acceleration.x = Const.ACCE;
            this.direction = Phaser.RIGHT;
        } else if (this.cursors.left.isDown) {
            this.direction = Phaser.LEFT;
            this.body.acceleration.x = -Const.ACCE;
        } else if (this.cursors.down.isDown) {

        } else {
            this.body.acceleration.x = 0;
        }

        if (this.body.touching.down || this.body.onFloor()) {
            if (this.body.velocity.x == 0) {
                this.animations.stop();
                this.frame = 0;
                this.face = this.direction;
            } else {
                if (this.body.velocity.x > 0 && this.direction == Phaser.LEFT) {
                    this.body.acceleration.x *= 5;
                    this.animations.stop();
                    this.frame = 4;
                    this.face = Phaser.LEFT;
                } else if (this.body.velocity.x < 0 && this.direction == Phaser.RIGHT) {
                    this.body.acceleration.x *= 5;
                    this.animations.stop();
                    this.frame = 4;
                    this.face = Phaser.RIGHT;
                } else {
                    this.animations.play('walk');
                    this.face = this.direction;
                }
            }
        }
    }

    _jump() {
        this.cursors.up.onUp.add(function(){
            this.canJump = true;
        }, this);

        if ((this.body.touching.down || this.body.onFloor()) && this.cursors.up.isDown && this.canJump) {
            this.animations.stop();
            this.frame = 5;
            this.body.velocity.y = Const.SMALL_JUMP_SPEED;
            this.jumptimer = 1;
            this.canJump = false;
            // this.game.state.getCurrentState().jump.play();
        } else if (this.cursors.up.isDown && (this.jumptimer != 0)) {
            if (this.jumptimer > Const.MAX_JUMP_TIMER) {
                this.jumptimer = 0;
            } else {
                this.jumptimer++;
                this.body.velocity.y = -200;
            }
        } else if (this.jumptimer != 0) {
            this.jumptimer = 0;
        }

        if(this.body.touching.up && !this.body.onFloor()){
            this.jumptimer = 0;
        }
    }

    _flip() {
        this.scale.x = this.face === Phaser.LEFT ? -1 : 1;
    }
}