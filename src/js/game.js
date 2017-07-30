
import * as states from 'states';
import * as world1 from 'states/worlds/world1';
import Const from "const";

export class Game extends Phaser.Game {

    constructor(id) {
        super(Const.GAME_WIDTH, Const.GAME_HEIGHT, Phaser.AUTO, id, null);
        this.worlds = ['world1']
        this._addStates();

        this.score = 0;
        this.coins = 0;
        this.timer = 400;

        this.life = 3;
    }

    _addStates() {
        Object.keys(states).forEach(function(state){
            this.state.add(state, states[state]);
        },  this);

        this._addWorldStates();
    }

    _addWorldStates() {
        this.worlds.forEach(function(world){
            this._addLevelStates(world);
        }, this);
    }

    _addLevelStates(world) {
        let currentWorld = eval(world);
        let worldNumber = 1;
        Object.keys(currentWorld).forEach(function(level){
            this.state.add('World' + (worldNumber++) + '-' + level, currentWorld[level]);
        }, this);
    }

    start() {
        this.state.start('Boot');
    }
}

