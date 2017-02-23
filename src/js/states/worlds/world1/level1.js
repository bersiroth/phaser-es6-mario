
import Level from "states/worlds/level";
import MushroomItem from "entities/items/mushroom";
import CoinItem from "entities/items/coin";
import brickBlock from "entities/blocs/brick";

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
        this.map.createFromObjects('blocs', 2, 'world', 2, true, true, this.bricks, brickBlock);
        this.map.createFromObjects('items', 925, 'item', 0, true, true, this.mushroom, MushroomItem);

        this.layer = this.map.createLayer('world-1');
        this.layer.resizeWorld();
        this.layer.wrap = true;

        this.music = this.game.add.audio('level-1');
        this.music.volume = 0.8;
        this.music.play();

    }

    update() {
        super.update();

        this.game.physics.arcade.collide(this.mushroom, this.layer);
        this.game.physics.arcade.collide(this.mushroom, this.bricks);
        this.game.physics.arcade.collide(this.mushroom, this.itemblocs);
    }

    render(){
        super.render();

        this.game.debug.text(this.game.time.fps || "--", 2, 14, "#00ff00");
    }

}