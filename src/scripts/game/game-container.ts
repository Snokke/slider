import PlayScene from "./play-scene/play-scene";

export default class GameContainer extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene);

    this.init();
  }

  private init(): void {
    const playScene = new PlayScene(this.scene);
    this.add(playScene);

    playScene.start();
  }
}
