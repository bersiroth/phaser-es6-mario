
import Level from "states/worlds/level";

export class Level1 extends Level {

    constructor(game) {
        super(game);
    }

    create() {
        super.create();

        this.mushroom = this.game.add.group();
        this.mushroom.enableBody = true;
        this.coins = this.game.add.group();
        this.coins.enableBody = true;
        this.bricks = this.game.add.group();
        this.bricks.enableBody = true;

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
        this.map.createFromObjects('blocs', 25, 'world', 24, true, true, this.coins);
        this.map.createFromObjects('blocs', 2, 'world', 2, true, true, this.bricks);
        // this.map.createFromObjects('items', 925, 'item', 0, true, true, mushroom);

        this.coins.callAll('animations.add', 'animations', 'spin', [24, 25, 26], 4, true);
        this.coins.callAll('animations.play', 'animations', 'spin');
        this.coins.setAll('body.allowGravity', false);
        this.coins.setAll('body.immovable', true);

        this.coins.forEach(function(coin){
            let gold = this.game.make.sprite(0, 0, 'item', 450);
            // var gold = game.make.sprite(0, 0, 'item', 252);
            gold.animations.add('go', [252, 253, 254, 255], 12, true);
            coin.addChild(gold);
        }, this);

        this.bricks.setAll('body.allowGravity', false);
        this.bricks.setAll('body.immovable', true);
        // mushroom.setAll('body.allowGravity', false);
        // mushroom.setAll('body.immovable', true);

        this.layer = this.map.createLayer('world-1');
        this.layer.resizeWorld();
        this.layer.wrap = true;

        this.coin = this.game.add.audio('coin');
        this.coin.volume = 0.3;
        this.bump = this.game.add.audio('bump');
        this.bump.volume = 0.7;

        this.music = this.game.add.audio('level-1');
        this.music.play();
    }

    update() {
        super.update();

        this.game.physics.arcade.collide(this.player, this.coins, function(player, coin){
            if(player.body.touching.up && coin.body.touching.down && coin.frame != 27){

                coin.animations.stop();
                coin.frame = 27;

                this.game.add.tween(coin).to({
                    y: coin.body.y - 5
                }, 75, null, true, 0, 0, true);

                coin.children[0].animations.play('go');

                this.coin.play();

                var goldTween = this.game.add.tween(coin.children[0]).to({
                    y: coin.children[0].y - 45
                }, 250, null, true, 0, 0, true);
                goldTween.onComplete.add(function(){
                    coin.removeChildAt(0);
                });
            }
        }, null, this);

        this.game.physics.arcade.collide(this.player, this.bricks, function(player, brick){
            if(player.body.touching.up && brick.body.touching.down){

                this.bump.play();

                this.game.add.tween(brick).to({
                    y: brick.body.y - 5
                }, 75, null, true, 0, 0, true);
            }
        }, null, this);

        this.game.physics.arcade.collide(this.player, this.mushroom, function(player, mushroom){
            if(player.body.touching.up && mushroom.body.touching.down){
                mushroom.body.height = 16;
                this.game.add.tween(mushroom).to({
                    y: mushroom.body.y - 16
                }, 75, null, true, 0, 0, false);
            }
        }, null, this);

    }

}