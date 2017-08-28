
import Level from "states/worlds/level";
import MushroomItem from "entities/items/mushroom";
import CoinItem from "entities/items/coin";
import brickBlock from "entities/blocs/brick";
import Ennemy from "entities/ennemy";
import Koopa from "entities/koopa";

export class Level1 extends Level {

    constructor(game) {
        super(game);
    }

    create() {
        super.create();

        this.map = this.game.add.tilemap('world');
        this.map.addTilesetImage('world', 'world');

        this.map.setCollisionBetween(12,15);
        this.map.setCollision([1, 2, 25, 34, 265, 266, 298, 299]);
        this.map.createFromObjects('items', 1198, 'item', 255, true, true, this.coins, CoinItem);
        this.map.createFromObjects('items', 1180, 'item', 255, true, true, this.coins, CoinItem);
        this.map.createFromObjects('blocs', 2, 'world', 1, true, true, this.bricks, brickBlock);
        this.map.createFromObjects('items', 925, 'item', 0, true, true, this.mushroom, MushroomItem);
        this.map.createFromObjects('ennemy', 1681, 'ennemy', 50, true, true, this.ennemies, Ennemy);
        // this.map.createFromObjects('ennemy', 1685, 'koopa', 50, true, true, this.ennemies, Koopa);
        this.map.createFromObjects('spawn', 'spawn', null, 0, true, true, this.spawns, undefined, false);

        this.spawns.forEach(spawn => {
            spawn.body.immovable = true;
            spawn.body.allowGravity = false;
        });

        this.player.x = this.spawns.getAt(this.game.spawn).x;
        this.player.y = this.spawns.getAt(this.game.spawn).height - this.player.height - 10;

        if(this.game.network.socket != undefined) {
            this.player2.x = this.spawns.getAt(this.game.spawn).x;
            this.player2.y = this.spawns.getAt(this.game.spawn).height - this.player.height - 10;
        }

        this.layer = this.map.createLayer('world-1');
        this.layer.resizeWorld();
        this.layer.wrap = true;

        this.music = this.game.add.audio('level-1');
        this.music.volume = 0.8;
        this.music.play();
    }

    update() {
        super.update();

        if(this.game.network.socket != undefined) {
            this.game.physics.arcade.collide(this.player, this.player2);
        }

        this.game.physics.arcade.collide(this.mushroom, this.layer);
        this.game.physics.arcade.collide(this.mushroom, this.bricks);
        this.game.physics.arcade.collide(this.mushroom, this.itemblocs);

        this.game.physics.arcade.collide(this.ennemies, this.layer);
        this.game.physics.arcade.collide(this.ennemies, this.bricks);
        this.game.physics.arcade.collide(this.ennemies, this.itemblocs);
        this.game.physics.arcade.collide(this.ennemies, this.ennemies);
    }

    render(){
        super.render();
        this.game.debug.text(this.game.time.fps || "--", 2, 14, "#00ff00");
    }

}