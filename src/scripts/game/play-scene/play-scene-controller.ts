import GAME_CONFIG from "../../core/game-config";
import CONFIG from "./config";
import HeroController from "./hero/hero-controller";
import Map from "./map/map";

export default class PlaySceneController extends Phaser.GameObjects.Container {
  private map: Map;
  private heroController: HeroController;

  constructor(scene: Phaser.Scene, data: any) {
    super(scene);

    this.map = data.map;
    this.heroController = data.heroController;

    this.initSignals();
  }

  public onUpdate(dt: number): void {
    this.heroController.update(dt);

    if (CONFIG.debug) {
      const heroCell = this.heroController.getHeroCell();
      this.map.showDebugCell(heroCell);
    }
  }

  public start(): void {
    this.heroController.start();

    this.map.x = GAME_CONFIG.baseWidth * 0.5;
    this.map.y = GAME_CONFIG.baseHeight * 0.5;
  }

  private initSignals(): void {
    // this.hero.on('onMoveTop', this.onHeroMoveTop, this);
    // this.hero.on('onMoveLeft', this.onHeroMoveLeft, this);
    // this.hero.on('onMoveDown', this.onHeroMoveDown, this);
    // this.hero.on('onMoveRight', this.onHeroMoveRight, this);
  }

  private onHeroMoveTop(): void {
    // this.hero.y -= HERO_CONFIG.movementStep;
  }

  private onHeroMoveLeft(): void {
    // this.hero.x -= HERO_CONFIG.movementStep;
  }

  private onHeroMoveDown(): void {
    // this.hero.y += HERO_CONFIG.movementStep;
  }

  private onHeroMoveRight(): void {
    // this.hero.x += HERO_CONFIG.movementStep;
  }
}
