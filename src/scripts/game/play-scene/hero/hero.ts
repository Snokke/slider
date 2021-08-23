import CONFIG from "../config";
import { HERO_STATE } from "./hero-config";

export default class Hero extends Phaser.GameObjects.Container {
  public currentState = HERO_STATE.Idle;
  public currentMapPosition: Cell;

  private view: Graphics;

  constructor(scene: Phaser.Scene) {
    super(scene);

    this.init();
  }

  private init(): void {
    const view: Graphics = this.view = this.scene.make.graphics({});
    view.fillStyle(0x00dd00, 1);
    view.fillRect(-CONFIG.cellWidth * 0.5, -CONFIG.cellHeight * 0.5, CONFIG.cellWidth, CONFIG.cellHeight);
    this.add(view);

    this.initSignals();
  }

  private initSignals(): void {
    const WASDKeys = this.scene.input.keyboard.addKeys('W,S,A,D');
    const arrowKeys = this.scene.input.keyboard.addKeys('LEFT,UP,RIGHT,DOWN');

    WASDKeys['W'].on('down', this.onPressUp, this);
    WASDKeys['A'].on('down', this.onPressLeft, this);
    WASDKeys['S'].on('down', this.onPressDown, this);
    WASDKeys['D'].on('down', this.onPressRight, this);

    arrowKeys['UP'].on('down', this.onPressUp, this);
    arrowKeys['LEFT'].on('down', this.onPressLeft, this);
    arrowKeys['DOWN'].on('down', this.onPressDown, this);
    arrowKeys['RIGHT'].on('down', this.onPressRight, this);
  }

  private onPressUp(): void {
    if (this.currentState === HERO_STATE.Idle) {
      this.currentState = HERO_STATE.MoveTop;
      this.emit('onMoveTop');
    }
  }

  private onPressLeft(): void {
    if (this.currentState === HERO_STATE.Idle) {
      this.currentState = HERO_STATE.MoveLeft;
      this.emit('onMoveLeft');
    }
  }

  private onPressDown(): void {
    if (this.currentState === HERO_STATE.Idle) {
      this.currentState = HERO_STATE.MoveDown;
      this.emit('onMoveDown');
    }
  }

  private onPressRight(): void {
    if (this.currentState === HERO_STATE.Idle) {
      this.currentState = HERO_STATE.MoveRight;
      this.emit('onMoveRight');
    }
  }
}
