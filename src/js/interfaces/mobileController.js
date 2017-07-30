/**
 * Created by bernard on 30/07/17.
 */
import Interface from "./interface";

export default class MobileController extends Interface{

    constructor(game,state,player) {
        super(game,state)

        this.player = player;
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.controller = this.game.add.group(this.game.world,'mobileController');

        let controler = this.state.add.sprite(-120,215, 'nes-controler');
        controler.scale.setTo(0.6);
        controler.fixedToCamera = true;
        this.controller.add(controler)

        let nintendo = this.state.add.sprite(145, 240, 'nintendo');
        nintendo.scale.setTo(0.6);
        nintendo.fixedToCamera = true;
        this.controller.add(nintendo)

        let right = this.state.add.button(92, 273, 'right');
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

        let left = this.state.add.button(5, 273, 'left');
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

        let up = this.state.add.button(48, 231, 'up');
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

        let down = this.state.add.button(48, 312, 'down');
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

        // var A = this.state.add.button(145, 300, 'A');
        let A = this.state.add.button(142, 273, 'A-button');
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
        let aLetter = this.state.add.sprite(165, 320, 'A-letter');
        aLetter.fixedToCamera = true;
        this.controller.add(aLetter)

        // var B = this.state.add.button(180, 240, 'B');
        let B = this.state.add.button(192, 273, 'B-button');
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
        let bLetter = this.state.add.sprite(215, 320, 'B-letter');
        bLetter.fixedToCamera = true;
        this.controller.add(bLetter)

        let center = this.state.add.sprite(48,273, 'center');
        center.fixedToCamera = true;
        this.controller.add(center)
    }
}