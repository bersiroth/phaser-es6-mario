/**
 * Created by bernard on 14/01/17.
 */
import Const from 'const';
import Entity from "./entity";

export default class Player2 extends Entity {

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
}