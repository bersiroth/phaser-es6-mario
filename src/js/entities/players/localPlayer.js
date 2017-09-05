/**
 * Created by bernard on 04/09/17.
 */

import Const from 'const';
import Player from "./player";

export default class LocalPlayer extends Player {

    constructor(game, x, y, key, frame) {
        super(game, x, y, key, frame);

        this.textureBig = 'mario-big';
        this.textureSmall = 'mario-small';
        this.canJump = true;
        this.cursors = game.input.keyboard.createCursorKeys();
    }

    update() {
        super.update();
        if(this.game.network.socket != undefined) {
            this.game.network.socket.emit('updatePlayer', {
                'x' : Number(Math.round(this.position.x+'e2')+'e-2'),
                'y' : Number(Math.round(this.position.y+'e2')+'e-2'),
                'frame' : this.frame,
                'face' : this.scale.x,
                'power' : this.power
            });
        }

        this.game.physics.arcade.overlap(this, this.ennemies, function(player, ennemy){
            if(ennemy.body.y - player.body.y > this.body.height * 0.6) {
                ennemy.die();
                player.body.velocity.y = Const.SMALL_JUMP_SPEED;
            } else {
                player.powerDown();
            }
        }, null, this);

        this.game.physics.arcade.collide(this, this.itemblocs, function(player, itemblocs){
            if(this.body.touching.up && itemblocs.body.touching.down){
                this.jumptimer = 0;
                itemblocs.collide();
            }
        }, null, this);

        this.game.physics.arcade.overlap(this, this.mushroom, function(player, mushroom){
            mushroom.destroy();
            player.powerup();

            this.game.score += 1000;
        }, null, this);

        this.game.physics.arcade.collide(this, this.bricks, function(player, brick){
            if(player.body.touching.up && brick.body.touching.down){
                this.jumptimer = 0;
                brick.collide(this.power);
            }
        }, null, this);

        this._run();
        this._move();
        this._jump();
        this._flip();
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

        if (this.body.velocity.y == 0 && this.cursors.up.isDown && this.canJump) {
            this.animations.stop();
            this.frame = 5;
            this.body.velocity.y = Const.SMALL_JUMP_SPEED;
            this.jumptimer = 1;
            this.canJump = false;
            this.jump.play();
        } else if (this.cursors.up.isDown && (this.jumptimer != 0)) {
            if (this.jumptimer > Const.MAX_JUMP_TIMER) {
                this.jumptimer = 0;
            } else {
                this.jumptimer++;
                this.body.velocity.y = -200;
            }
        } else if (this.jumptimer != 0) {
            this.jumptimer = 0;
            this.body.velocity.y = 0;
        }
    }
}