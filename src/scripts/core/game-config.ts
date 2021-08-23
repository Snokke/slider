const BASE_WIDTH: number = 1280;
const BASE_HEIGHT: number = 720;

const GAME_CONFIG = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  baseWidth: BASE_WIDTH,
  baseHeight: BASE_HEIGHT,
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: BASE_WIDTH,
    height: BASE_HEIGHT
  },
};

export default GAME_CONFIG;
