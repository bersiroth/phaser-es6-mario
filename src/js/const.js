module.exports = {

    BLOCK_HEIGHT: 16,
    BLOCK_WIDTH: 16,
    get GAME_HEIGHT () {
        return 15 * this.BLOCK_HEIGHT;
    },
    get GAME_WIDTH () {
        return 15 * this.BLOCK_WIDTH;
    },
    GRAVITY: 960,
    DRAG: 250,
    MAX_SPEED: 120,
    MAX_SPEED_SPRINT: 200,
    ACCE: 120,
    SMALL_JUMP_SPEED: -150,
    MAX_JUMP_TIMER: 17,
    SCALE: 2,

    ENNEMY_DISTANCE_MOVE: 140,
    ENNEMY_SPEED: 40,

    INVULNERABLE_TIME: 100,

    DEBUG_MOBILE: false
};