import Const from "./../const";

export class Boot extends Phaser.State {

    preload() {
        this.game.stage.backgroundColor = '#000';
        this.load.image('loader-bar', 'img/loading/loader-bar.png');
        this.load.image('loader-bg', 'img/loading/loader-bg.png');
    }

    create() {
        this.game.scale.mode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.minHeight = Const.GAME_HEIGHT * Const.SCALE;
        this.game.scale.minWidth = Const.GAME_WIDTH * Const.SCALE;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        if(!this.game.device.desktop || Const.DEBUG_MOBILE) {
            if(!Const.DEBUG_MOBILE){
                this.game.scale.minHeight = (23 * Const.BLOCK_HEIGHT) * Const.SCALE;
                this.game.scale.minWidth = Const.GAME_WIDTH * Const.SCALE;
                this.game.scale.forceOrientation(false, true);
                this.game.scale.enterIncorrectOrientation.add(function(){
                    if(!this.game.device.desktop){
                        document.getElementById("turn").style.display="block";
                    }
                });
                this.game.scale.leaveIncorrectOrientation.add(function(){
                    if(!this.game.device.desktop){
                        document.getElementById("turn").style.display="none";
                    }
                });
            } else {
                this.game.scale.minHeight = (23 * Const.BLOCK_HEIGHT) * Const.SCALE;
            }
            this.game.scale.setGameSize(Const.GAME_WIDTH, 23 * Const.BLOCK_HEIGHT);
        }
        this.game.scale.refresh();
        this.state.start('Load');
    }

}