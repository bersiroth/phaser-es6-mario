/**
 * Created by bernard on 30/07/17.
 */
import Interface from "./interface";

export default class Hud extends Interface{

    constructor(game,state) {
        super(game,state)

        this.hud = this.game.add.group(this.game.world, 'hub');

        this.scoreText = this.state.add.bitmapText(10, 10, 'plumber_bros', 'MARIO', 8);
        this.scoreData = this.state.add.bitmapText(10, 20, 'plumber_bros', this.game.score, 8);

        this.coinsLogo = this.state.add.sprite(68, 20, 'coin', 0);
        this.coinsLogo.animations.add('spin', [0, 1, 2], 4, true);
        this.coinsLogo.animations.play('spin');
        this.coinsData = this.state.add.bitmapText(75, 20, 'plumber_bros', 'x' + this.game.coins, 8);

        this.wordlText = this.state.add.bitmapText(105, 10, 'plumber_bros', 'WORLD', 8);
        this.worldData = this.state.add.bitmapText(110, 20, 'plumber_bros', '1-1', 8);

        this.timeText = this.state.add.bitmapText(155, 10, 'plumber_bros', 'TIME', 8);
        this.timeData = this.state.add.bitmapText(162, 20, 'plumber_bros', this.game.timer, 8);

        this.game.time.events.loop(1000, function(){
            this.game.timer -= 1;
        }, this);

        this.lifeText = this.state.add.bitmapText(195, 10, 'plumber_bros', 'LIFE', 8);
        this.lifeData = this.state.add.bitmapText(207, 20, 'plumber_bros', this.game.life, 8);

        this.hud.addMultiple([this.coinsLogo, this.scoreText, this.scoreData, this.coinsData, this.wordlText, this.worldData, this.timeText, this.timeData, this.lifeText, this.lifeData]);
        this.hud.fixedToCamera = true;
    }

    update() {
        this.scoreData.text = ('000000' + this.game.score).slice(-6);
        this.coinsData.text = 'x' + this.game.coins;
        this.timeData.text  = this.game.timer;
    }
}