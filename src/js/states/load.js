
export class Load extends Phaser.State {

    preload() {
        this.add.sprite(this.game.world.centerX - 77, this.game.world.centerY - 3, 'loader-bg');
        this.loaderBar = this.add.sprite(this.game.world.centerX - 75, this.game.world.centerY, 'loader-bar');
        this.load.setPreloadSprite(this.loaderBar);

        // world resources
        this.load.tilemap('world', 'resources/maps/world-anim.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.spritesheet('world', 'resources/images/world.png', 16, 16);
        this.load.spritesheet('item', 'resources/images/item.png', 16, 16);
        this.load.spritesheet('mario-small', 'resources/images/mario_sheet_small.png', 16, 16, 14);
        this.load.spritesheet('mario-big', 'resources/images/mario_sheet_big.png', 16, 32, 14);

        // menu resources
        this.load.image('menu', 'resources/images/menu.png');

        // mobile controller resources
        this.load.image('up', 'resources/images/controller/up.png');
        this.load.image('down', 'resources/images/controller/down.png');
        this.load.image('left', 'resources/images/controller/left.png');
        this.load.image('right', 'resources/images/controller/right.png');
        this.load.image('center', 'resources/images/controller/center.png');
        this.load.image('A-button', 'resources/images/controller/button.png');
        this.load.image('B-button', 'resources/images/controller/button.png');
        this.load.image('A-letter', 'resources/images/controller/a.png');
        this.load.image('B-letter', 'resources/images/controller/b.png');
        this.load.image('nes-controler', 'resources/images/controller/controler-small.png');
        this.load.image('nintendo', 'resources/images/controller/nintendo.png');

        // audio resources
        this.load.audio('level-1', 'resources/sounds/level/world-1-1.mp3');
        this.load.audio('level-2', 'resources/sounds/level/world-1-2.mp3');
        this.load.audio('1-up', 'resources/sounds/smb_1-up.wav');
        this.load.audio('bump', 'resources/sounds/smb_bump.wav');
        this.load.audio('coin', 'resources/sounds/smb_coin.wav');
        this.load.audio('jump-small', 'resources/sounds/smb_jumpsmall.wav');
        this.load.audio('die', 'resources/sounds/smb_mariodie.wav');
        this.load.audio('powerup-appears', 'resources/sounds/smb_powerup_appears.wav');
        this.load.audio('stomp', 'resources/sounds/smb_stomp.wav');

        // font resources
        this.load.bitmapFont('plumber_bros', 'resources/fonts/plumber_bros.png  ', 'resources/fonts/plumber_bros.xml');
    }

    create() {
        this.state.start('Menu');
    }

}