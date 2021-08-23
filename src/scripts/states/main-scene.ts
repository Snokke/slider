import GameContainer from '../game/game-container';

export default class MainScene extends Phaser.Scene {
  private view: Container;

  constructor() {
    super({ key: 'MainScene' });
  }

  public create(): void {
    this.view = this.add.container();

    const gameContainer = new GameContainer(this);
    this.view.add(gameContainer);

    this.addUpdateToContainers();
  }

  private addUpdateToContainers(): void {
    function update(gameObj: any, delta: number, time: number): void {
      if (gameObj.list) {
        gameObj.onUpdate?.(delta, time);

        for (let i = 0; i < gameObj.list.length; i++) {
          update(gameObj.list[i], delta, time);
        }
      }
    }

    this.events.on('update', (time: number, delta: number) => {
      update(this.view, delta, time);
    });
  }
}
