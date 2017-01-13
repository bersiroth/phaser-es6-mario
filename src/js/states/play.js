import Const from "./../const";

export class Play extends Phaser.State {

    preload() {
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

        this.game.scale.mode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.minHeight = Const.GAME_HEIGHT() * Const.SCALE;
        this.game.scale.minWidth = Const.GAME_WIDTH() * Const.SCALE;
        if(!this.game.device.desktop || Const.DEBUG_MOBILE) {
            if(!Const.DEBUG_MOBILE){
                // game.scale.minHeight = (23 * BLOCK_HEIGHT) * (SCALE * 2) ;
                // game.scale.minWidth = GAME_WIDTH * (SCALE * 2);
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
            this.game.scale.setGameSize(Const.GAME_WIDTH(), 23 * Const.BLOCK_HEIGHT);
        }
        this.game.scale.refresh();
    }

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = Const.GRAVITY;
        this.game.stage.backgroundColor = '#6f85ff';

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

        this.player = this.game.add.sprite(32, 200, 'mario');
        // this.player = game.add.sprite(245, 200, 'mario');
        this.player.smoothed = true;
        this.player.animations.add('walk', [1, 2, 3], 8, true);
        this.game.physics.arcade.enable(this.player);
        this.player.body.drag.set(Const.DRAG,0);
        this.player.body.collideWorldBounds = true;
        this.player.body.maxVelocity.set(Const.MAX_SPEED, 80);
        this.player.anchor.setTo(.5,.5);
        this.player.body.setSize(this.player.body.width,this.player.body.height);

        this.cursors = this.game.input.keyboard.createCursorKeys();

        if(!this.game.device.desktop || Const.DEBUG_MOBILE) {
            let controler = this.game.add.sprite(-120,215, 'nes-controler');
            controler.scale.setTo(0.6);
            controler.fixedToCamera = true;

            let nintendo = this.game.add.sprite(145, 240, 'nintendo');
            nintendo.scale.setTo(0.6);
            nintendo.fixedToCamera = true;

            let right = this.game.add.button(92, 273, 'right');
            right.fixedToCamera = true;
            right.events.onInputOver.add(function () {
                this.cursors.right.isDown = true;
            }, this);
            right.events.onInputOut.add(function () {
                this.cursors.right.isDown = false;
            }, this);
            right.events.onInputDown.add(function () {
                this.cursors.right.isDown = true;
            }, this);
            right.events.onInputUp.add(function () {
                this.cursors.right.isDown = false;
            }, this);

            let left = this.game.add.button(5, 273, 'left');
            left.fixedToCamera = true;
            left.events.onInputOver.add(function () {
                this.cursors.left.isDown = true;
            }, this);
            left.events.onInputOut.add(function () {
                this.cursors.left.isDown = false;
            }, this);
            left.events.onInputDown.add(function () {
                this.cursors.left.isDown = true;
            }, this);
            left.events.onInputUp.add(function () {
                this.cursors.left.isDown = false;
            }, this);

            let up = this.game.add.button(48, 231, 'up');
            up.fixedToCamera = true;
            up.events.onInputOver.add(function () {
                this.cursors.up.isDown = true;
            }, this);
            up.events.onInputOut.add(function () {
                this.cursors.up.isDown = false;
                this.canJump = true;
            }, this);
            up.events.onInputDown.add(function () {
                this.cursors.up.isDown = true;
            }, this);
            up.events.onInputUp.add(function () {
                this.cursors.up.isDown = false;
                this.canJump = true;
            }, this);

            let down = this.game.add.button(48, 312, 'down');
            down.fixedToCamera = true;
            down.events.onInputOver.add(function () {
                this.cursors.down.isDown = true;
            }, this);
            down.events.onInputOut.add(function () {
                this.cursors.down.isDown = false;
            }, this);
            down.events.onInputDown.add(function () {
                this.cursors.down.isDown = true;
            }, this);
            down.events.onInputUp.add(function () {
                this.cursors.down.isDown = false;
            }, this);

            // var A = game.add.button(145, 300, 'A');
            let A = this.game.add.button(142, 273, 'A-button');
            A.scale.setTo(0.6);
            A.fixedToCamera = true;
            A.events.onInputOver.add(function () {
                this.cursors.up.isDown = true;
            }, this);
            A.events.onInputOut.add(function () {
                this.cursors.up.isDown = false;
                this.canJump = true;
            }, this);
            A.events.onInputDown.add(function () {
                this.cursors.up.isDown = true;
            }, this);
            A.events.onInputUp.add(function () {
                this.cursors.up.isDown = false;
                this.cursors = true;
            }, this);
            let aLetter = this.game.add.sprite(165, 320, 'A-letter');
            aLetter.fixedToCamera = true;

            // var B = game.add.button(180, 240, 'B');
            let B = this.game.add.button(192, 273, 'B-button');
            B.scale.setTo(0.6);
            B.fixedToCamera = true;
            B.events.onInputOver.add(function () {
                this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT).isDown = true;
            }, this);
            B.events.onInputOut.add(function () {
                this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT).isDown = false;
            }, this);
            B.events.onInputDown.add(function () {
                this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT).isDown = true;
            }, this);
            B.events.onInputUp.add(function () {
                this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT).isDown = false;
            }, this);
            var bLetter = this.game.add.sprite(215, 320, 'B-letter');
            bLetter.fixedToCamera = true;

            var center = this.game.add.sprite(48,273, 'center');
            center.fixedToCamera = true;
        }
    }

    update() {
        if(!this.player.inCamera){
            this.game.state.restart();
        }

        this.player.scale.x = 1;

        this.game.physics.arcade.collide(this.player, this.layer);

        this.game.physics.arcade.collide(this.player, this.coins, function(player, coin){
            if(player.body.touching.up && coin.body.touching.down && coin.frame != 27){

                coin.animations.stop();
                coin.frame = 27;

                this.game.add.tween(coin).to({
                    y: coin.body.y - 5
                }, 75, null, true, 0, 0, true);

                coin.children[0].animations.play('go');

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

        this.player.animations.currentAnim.delay = Math.min(200, 10000/Math.abs(this.player.body.velocity.x));

        let acceMax = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT).isDown ? Const.MAX_SPEED_SPRINT : Const.MAX_SPEED;
        this.player.body.maxVelocity.set(acceMax, Const.MAX_SPEED * 10);

        if (this.cursors.right.isDown) {
            this.player.body.acceleration.x = Const.ACCE;
            this.direction = "right";
        } else if (this.cursors.left.isDown) {
            this.direction = "left";
            this.player.body.acceleration.x = -Const.ACCE;
        } else if (this.cursors.down.isDown) {

        } else {
            this.player.body.acceleration.x = 0;
        }

        if (this.player.body.touching.down || this.player.body.onFloor()) {
            if (this.player.body.velocity.x == 0) {
                this.player.animations.stop();
                this.player.frame = 0;
            } else {
                if (this.player.body.velocity.x > 0 && this.direction == "left") {
                    this.player.body.acceleration.x *= 5;
                    this.player.animations.stop();
                    this.player.frame = 4;
                    this.face = "left";
                } else if (this.player.body.velocity.x < 0 && this.direction == "right") {
                    this.player.body.acceleration.x *= 5;
                    this.player.animations.stop();
                    this.player.frame = 4;
                    this.face = "right";
                } else {
                    this.player.animations.play('walk');
                    this.face = this.direction;
                }
            }
        }

        this.lastDirection = this.direction;

        this.cursors.up.onUp.add(function(){
            this.canJump = true;
        }, this);

        if ((this.player.body.touching.down || this.player.body.onFloor()) && this.cursors.up.isDown && this.canJump) {
            this.player.animations.stop();
            this.player.frame = 5;
            this.player.body.velocity.y = Const.SMALL_JUMP_SPEED;
            this.jumptimer = 1;
            this.canJump = false;
        } else if (this.cursors.up.isDown && (this.jumptimer != 0)) {
            if (this.jumptimer > Const.MAX_JUMP_TIMER) {
                this.jumptimer = 0;
            } else {
                this.jumptimer++;
                this.player.body.velocity.y = -200;
            }
        } else if (this.jumptimer != 0) {
            this.jumptimer = 0;
        }

        if(this.player.body.touching.up && !this.player.body.onFloor()){
            this.jumptimer = 0;
        }

        if(this.game.camera.x < this.player.body.x-(Const.BLOCK_HEIGHT*7)){
            this.game.camera.x = this.player.body.x-(Const.BLOCK_HEIGHT*7);
        }

        if(this.player.body.x <= this.game.camera.x){
            this.player.animations.stop();
            this.player.body.x = this.game.camera.x;
            this.player.body.velocity.x = 0;
        }

        if(this.face == "left"){
            this.player.scale.x = -1;
        }
    }

}