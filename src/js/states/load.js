
export class Load extends Phaser.State {

    preload() {
        this.loaderBg = this.add.sprite(this.game.world.centerX - 77, this.game.world.centerY - 3, 'loader-bg');
        this.loaderBar = this.add.sprite(this.game.world.centerX - 75, this.game.world.centerY, 'loader-bar');
        this.load.setPreloadSprite(this.loaderBar);

        this.load.tilemap('world', 'map/world-anim.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.spritesheet('world', 'img/world.png', 16, 16);
        this.load.spritesheet('item', 'img/item.png', 16, 16);
        this.load.image('up', 'img/controller/up.png');
        this.load.image('down', 'img/controller/down.png');
        this.load.image('left', 'img/controller/left.png');
        this.load.image('right', 'img/controller/right.png');
        this.load.image('center', 'img/controller/center.png');
        this.load.image('A-button', 'img/controller/button.png');
        this.load.image('B-button', 'img/controller/button.png');
        this.load.image('A-letter', 'img/controller/a.png');
        this.load.image('B-letter', 'img/controller/b.png');
        this.load.image('nes-controler', 'img/controller/controler-small.png');
        this.load.image('nintendo', 'img/controller/nintendo.png');
        this.load.spritesheet('mario', 'img/mario_sheet_small.png', 16, 16, 14);
        this.load.audio('level-1', 'sound/level/world-1-1.mp3');
        this.load.audio('level-2', 'sound/level/world-1-2.mp3');
        this.load.audio('1-up', 'sound/smb_1-up.wav');
        this.load.audio('bump', 'sound/smb_bump.wav');
        this.load.audio('coin', 'sound/smb_coin.wav');
        this.load.audio('jump-small', 'sound/smb_jumpsmall.wav');
        this.load.audio('die', 'sound/smb_mariodie.wav');
        this.load.audio('powerup-appears', 'sound/smb_powerup_appears.wav');
        this.load.audio('stomp', 'sound/smb_stomp.wav');
    }

    create() {
        this.state.start('Menu');
    }

}