/**
 * Created by bernard on 14/01/17.
 */

import Const from 'const';
import Entity from "./../entity";

export default class Player extends Entity {

    constructor(game, x, y, key, frame) {
        super( game, x, y, key, frame);

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
        this.invulnerable = 0;
        this.power = false;

        this.dieSound = this.game.add.audio('die');
        this.jump = this.game.add.audio('jump-small');
        this.powerupSound = this.game.add.audio('powerup');
        this.jump.volume = 0.3;
    }

    update() {
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
                this.loadTexture(this.textureBig, 0, false);
                this.body.setSize(this.body.width ,this.body.height * 2);
                this.jump = this.game.add.audio('jump');
            }, this);
        }
    }

    powerDown() {
        if(this.invulnerable == 0){
            if (this.power == true) {
                this.loadTexture(this.textureSmall, 0, false);
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

    _flip() {
        this.scale.x = this.face === Phaser.LEFT ? -1 : 1;
    }
}