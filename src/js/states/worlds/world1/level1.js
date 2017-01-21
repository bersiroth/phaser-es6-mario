
import Level from "states/worlds/level";
import MushroomItem from "entities/items/mushroom";
import CoinItem from "entities/items/coin";

export class Level1 extends Level {

    constructor(game) {
        super(game);
    }

    create() {
        this.game.time.advancedTiming = true;

        this.coins = this.game.add.group();
        this.bricks = this.game.add.group();
        this.bricks.enableBody = true;

        this.itemblocs = this.game.add.group(this.game.world, 'itemblocs');

        this.map = this.game.add.tilemap('world');
        this.map.addTilesetImage('world', 'world');
        this.map.setCollision(1);
        this.map.setCollisionBetween(12,15);
        this.map.setCollision(34);
        this.map.setCollision(25);
        this.map.setCollision(2);
        this.map.setCollision(298);
        this.map.setCollision(299);
        this.map.setCollision(265);
        this.map.setCollision(266);
        this.mushroom = this.game.add.group();
        this.map.createFromObjects('items', 1198, 'item', 255, true, true, this.coins, CoinItem);
        this.map.createFromObjects('items', 1180, 'item', 255, true, true, this.coins, CoinItem);
        this.map.createFromObjects('blocs', 2, 'world', 2, true, true, this.bricks);
        this.map.createFromObjects('items', 925, 'item', 0, true, true, this.mushroom, MushroomItem);

        this.bricks.setAll('body.allowGravity', false);
        this.bricks.setAll('body.immovable', true);

        this.layer = this.map.createLayer('world-1');
        this.layer.resizeWorld();
        this.layer.wrap = true;

        this.coin = this.game.add.audio('coin');
        this.coin.volume = 0.3;
        this.bump = this.game.add.audio('bump');
        this.bump.volume = 0.7;

        this.music = this.game.add.audio('level-1');
        this.music.play();

        this.game.world.bringToTop(this.mushroom);
        this.game.world.bringToTop(this.itemblocs);
        super.create();
    }

    update() {
        super.update();

        this.game.physics.arcade.collide(this.mushroom, this.layer);
        this.game.physics.arcade.collide(this.mushroom, this.itemblocs);
        this.game.physics.arcade.collide(this.mushroom, this.bricks );

        this.game.physics.arcade.collide(this.player, this.itemblocs, function(player, bloc){
            if(player.body.touching.up && bloc.body.touching.down && bloc.frame != 27){
                bloc.collide();
            }
        }, null, this);

        this.game.physics.arcade.collide(this.player, this.mushroom, function(player, mushroom){
            mushroom.destroy();
            player.up();
        }, null, this);

        this.game.physics.arcade.collide(this.player, this.bricks, function(player, brick){
            if(player.body.touching.up && brick.body.touching.down){
                this.bump.play();
                this.game.add.tween(brick).to({
                    y: brick.body.y - 5
                }, 75, null, true, 0, 0, true);
            }
        }, null, this);

        this.game.physics.arcade.collide(this.player, this.itemEntittiesGroup);
    }

    render(){
        super.render();
        this.game.debug.text(this.game.time.fps || "--", 2, 14, "#00ff00");
    }

}