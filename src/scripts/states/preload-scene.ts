export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload(): void {
    this.load.image('phaser-logo', 'assets/img/phaser-logo.png');
    this.load.image('grass', 'assets/img/grass.png');
    this.load.image('hero_back', 'assets/img/hero_back.png');
    this.load.image('hero_front', 'assets/img/hero_front.png');
    this.load.image('hero_left', 'assets/img/hero_left.png');
    this.load.image('hero_right', 'assets/img/hero_right.png');
  }

  create(): void {
    this.scene.start('MainScene');
  }
}
