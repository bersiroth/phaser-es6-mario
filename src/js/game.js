
import * as states from './states';
import Const from "./const";

export class Game extends Phaser.Game {

    constructor(id) {
        super(Const.GAME_WIDTH(), Const.GAME_HEIGHT(), Phaser.AUTO, id, null);
        this.addStates();
    }

    addStates() {
        Object.keys(states).forEach(function(state){
            this.state.add(state, states[state]);
        },  this);
    }

    start(stateName) {
        this.state.start(stateName);
    }
}

