import Const from "const";
import Player from "entities/player";
import Hud from "interfaces/hud";
import MobileController from "interfaces/mobileController";

export default class Level extends Phaser.State {

    constructor(game) {
        super(game);
    }

    create() {
        this.game.time.advancedTiming = true;

        this.coins      = this.game.add.group(this.game.world, 'coins');
        this.bricks     = this.game.add.group(this.game.world, 'bricks');
        this.itemblocs  = this.game.add.group(this.game.world, 'itemblocs');
        this.mushroom   = this.game.add.group(this.game.world, 'mushroom');
        this.ennemies   = this.game.add.group(this.game.world, 'ennemies');

        this.bump = this.game.add.audio('bump');
        this.bump.volume = 0.7;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = Const.GRAVITY;
        this.game.stage.backgroundColor = '#6f85ff';

        this.hud = new Hud(this.game, this);

        this.player = new Player(this.game, 32, 200, 'mario-small', 1);
        this.game.world.addChild(this.player);

        if(!this.game.device.desktop || Const.DEBUG_MOBILE) {
            this.mobileController = new MobileController(this.game, this, this.player);
        }
    }

    render() {
        // this.game.debug.body(this.player, 32, 32);
        // this.game.debug.spriteInfo(this.player, 16, 16);
    }

    preRender() {
        this.game.world.bringToTop(this.mushroom);
        this.game.world.bringToTop(this.itemblocs);
        this.game.world.bringToTop(this.ennemies);
        this.game.world.bringToTop(this.player);

        if(!this.game.device.desktop || Const.DEBUG_MOBILE) {
            this.game.world.bringToTop(this.mobileController.controller);
        }
    }

    update() {
        if(!this.player.inCamera){
            this.music.stop();
            this.player.die();
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

        this.ennemies.forEach(function(ennemy){
            if(ennemy.moved == false){
                if(ennemy.body.x - this.player.body.x < Const.ENNEMY_DISTANCE_MOVE){
                    ennemy.move();
                }
            }
        }, this);

        this.hud.update();
    }

    pauseUpdate() {
        this.game.tweens.update();
    }

    shutdown() {
        this.music.stop();
        this.game.world.setBounds(0, 0, this.game.width, this.game.height);
    }

}