/**
 * Created by bernard on 14/01/17.
 */
import Const from 'const';
import Entity from "./entity";

export default class Player extends Entity {

    constructor(game, x, y, key, frame) {
        super(game, x, y, key, frame);

        this.face = Phaser.LEFT;
        this.smoothed = true;
        this.animations.add('walk', [1, 2, 3], 8, true);
        game.physics.arcade.enable(this);
        this.body.drag.set(Const.DRAG,0);
        this.body.collideWorldBounds = false;
        this.body.maxVelocity.set(Const.MAX_SPEED, 80);
        this.body.setSize(this.body.width-8,this.body.height, 5, 0);
        this.anchor.setTo(.5,0);
        this.scale.x = 1;
        this.canJump = true;
        this.power = false;

        this.cursors = game.input.keyboard.createCursorKeys();

        this.dieSound = this.game.add.audio('die');
        this.jump = this.game.add.audio('jump-small');
        this.powerupSound = this.game.add.audio('powerup');
        this.jump.volume = 0.3;

        this.invulnerable = 0;
    }

    update() {
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

        if(this.invulnerable != 0){
            if(this.invulnerable % 2 == 0) this.alpha = (this.alpha == 1) ? 0 : 1;
            this.invulnerable--;
        } else {
            this.alpha = 1;
        }
    }

    powerup() {
        if (this.power != true) {
            this.frame = 0;
            this.position.set(this.position.x, this.position.y - 16);
            this.game.paused = true;

            this.power = true;
            this.game.sound.pauseAll();
            this.game.sound.unsetMute();
            this.powerupSound.play();

            let s = this.game.add.tween(this.scale);
            s.to({
                y: 2
            }, 75, Phaser.Easing.Linear.None, true, 0, 2, true);

            s.onComplete.add(function() {
                this.scale.set(1 ,1);
                this.game.paused = false;
                this.game.sound.resumeAll();
                this.loadTexture('mario-big', 0, false);
                this.body.setSize(this.body.width ,this.body.height * 2);
                this.jump = this.game.add.audio('jump');
            }, this);
        }
    }

    powerDown() {
        if(this.invulnerable == 0){
            if (this.power == true) {
                this.loadTexture('mario-small', 0, false);
                this.body.setSize(this.body.width ,this.body.height / 2);
                this.jump = this.game.add.audio('jump-small');
                // this.powerup.play();
                this.power = false;
                this.invulnerable = Const.INVULNERABLE_TIME;
            } else {
                this.die();
            }
        }
    }

    die() {
        this.game.paused = true;
        this.game.sound.pauseAll();
        this.game.sound.unsetMute();
        this.dieSound.play();
        this.dieSound.onStop.add(() => {
            this.game.paused = false;
            this.game.life -= 1;

            if (this.game.life == 0) {
                this.game.life = 3;
                this.game.score = 0;
                this.game.spawn = 0;
                this.game.state.start('Menu');
            } else {
                this.game.state.restart();
            }
        });
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

        if(this.body.touching.up){
            this.jumptimer = 0;
        }
    }

    _flip() {
        this.scale.x = this.face === Phaser.LEFT ? -1 : 1;
    }
}