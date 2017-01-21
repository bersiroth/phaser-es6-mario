import Const from "const";
import Player from "entities/player";

export default class Level extends Phaser.State {

    constructor(game) {
        super(game);
    }

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = Const.GRAVITY;
        this.game.stage.backgroundColor = '#6f85ff';

        this.player = new Player(this.game, 32, 200, 'mario-small', 1);
        this.game.world.addChild(this.player);

        this.die = this.game.add.audio('die');
        this.jump = this.game.add.audio('jump-small');
        this.jump.volume = 0.3;

        this.cursors = this.game.input.keyboard.createCursorKeys();

        if(!this.game.device.desktop || Const.DEBUG_MOBILE) {

            this.controller = this.game.add.group();

            let controler = this.game.add.sprite(-120,215, 'nes-controler');
            controler.scale.setTo(0.6);
            controler.fixedToCamera = true;
            this.controller.add(controler)

            let nintendo = this.game.add.sprite(145, 240, 'nintendo');
            nintendo.scale.setTo(0.6);
            nintendo.fixedToCamera = true;
            this.controller.add(nintendo)

            let right = this.game.add.button(92, 273, 'right');
            right.fixedToCamera = true;
            right.events.onInputOver.add(function () {
                this.cursors.right.isDown = true;
            }, this);
            right.events.onInputOut.add(function () {
                this.cursors.right.isDown = false;
            }, this);
            right.events.onInputDown.add(function () {
                this.cursors.right.isDown = true;
            }, this);
            right.events.onInputUp.add(function () {
                this.cursors.right.isDown = false;
            }, this);
            this.controller.add(right)

            let left = this.game.add.button(5, 273, 'left');
            left.fixedToCamera = true;
            left.events.onInputOver.add(function () {
                this.cursors.left.isDown = true;
            }, this);
            left.events.onInputOut.add(function () {
                this.cursors.left.isDown = false;
            }, this);
            left.events.onInputDown.add(function () {
                this.cursors.left.isDown = true;
            }, this);
            left.events.onInputUp.add(function () {
                this.cursors.left.isDown = false;
            }, this);
            this.controller.add(left)

            let up = this.game.add.button(48, 231, 'up');
            up.fixedToCamera = true;
            up.events.onInputOver.add(function () {
                this.cursors.up.isDown = true;
            }, this);
            up.events.onInputOut.add(function () {
                this.cursors.up.isDown = false;
                this.player.canJump = true;
            }, this);
            up.events.onInputDown.add(function () {
                this.cursors.up.isDown = true;
            }, this);
            up.events.onInputUp.add(function () {
                this.cursors.up.isDown = false;
                this.player.canJump = true;
            }, this);
            this.controller.add(up)

            let down = this.game.add.button(48, 312, 'down');
            down.fixedToCamera = true;
            down.events.onInputOver.add(function () {
                this.cursors.down.isDown = true;
            }, this);
            down.events.onInputOut.add(function () {
                this.cursors.down.isDown = false;
            }, this);
            down.events.onInputDown.add(function () {
                this.cursors.down.isDown = true;
            }, this);
            down.events.onInputUp.add(function () {
                this.cursors.down.isDown = false;
            }, this);
            this.controller.add(down)

            // var A = game.add.button(145, 300, 'A');
            let A = this.game.add.button(142, 273, 'A-button');
            A.scale.setTo(0.6);
            A.fixedToCamera = true;
            A.events.onInputOver.add(function () {
                this.cursors.up.isDown = true;
            }, this);
            A.events.onInputOut.add(function () {
                this.cursors.up.isDown = false;
                this.player.canJump = true;
            }, this);
            A.events.onInputDown.add(function () {
                this.cursors.up.isDown = true;
            }, this);
            A.events.onInputUp.add(function () {
                this.cursors.up.isDown = false;
                this.player.canJump = true;
            }, this);
            this.controller.add(A)
            let aLetter = this.game.add.sprite(165, 320, 'A-letter');
            aLetter.fixedToCamera = true;
            this.controller.add(aLetter)

            // var B = game.add.button(180, 240, 'B');
            let B = this.game.add.button(192, 273, 'B-button');
            B.scale.setTo(0.6);
            B.fixedToCamera = true;
            B.events.onInputOver.add(function () {
                this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT).isDown = true;
            }, this);
            B.events.onInputOut.add(function () {
                this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT).isDown = false;
            }, this);
            B.events.onInputDown.add(function () {
                this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT).isDown = true;
            }, this);
            B.events.onInputUp.add(function () {
                this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT).isDown = false;
            }, this);
            this.controller.add(B)
            let bLetter = this.game.add.sprite(215, 320, 'B-letter');
            bLetter.fixedToCamera = true;
            this.controller.add(bLetter)

            let center = this.game.add.sprite(48,273, 'center');
            center.fixedToCamera = true;
            this.controller.add(center)
        }
    }

    render() {
    }

    update() {

        if(!this.player.inCamera){
            this.music.stop();
            this.die.play();
            this.game.state.start('Menu');
        }

        this.game.physics.arcade.collide(this.player, this.layer);

        if(this.game.camera.x < this.player.body.x-(Const.BLOCK_HEIGHT*7)){
            this.game.camera.x = this.player.body.x-(Const.BLOCK_HEIGHT*7);
        }

        if(this.player.body.x <= this.game.camera.x){
            this.player.animations.stop();
            this.player.body.x = this.game.camera.x;
            this.player.body.velocity.x = 0;
        }

    }

    shutdown() {
        this.music.stop();
        this.game.world.setBounds(0, 0, this.game.width, this.game.height);
    }

}