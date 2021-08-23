import CONFIG from './config';
import HeroController from './hero/hero-controller';
import Map from './map/map';
import { LEVEL_CONFIG } from './map/map-config';
import PlaySceneController from './play-scene-controller';

export default class PlayScene extends Phaser.GameObjects.Container {
  private map: Map;
  private heroController: HeroController;
  private controller: PlaySceneController;

  constructor(scene: Phaser.Scene) {
    super(scene);

    this.init();
  }

  public start(): void {
    this.controller.start();
  }

  private init(): void {
    const map = this.map = new Map(this.scene);
    const heroController = this.heroController = this.createHeroController();

    map.add(heroController);
    this.add(map);

    const data: any = {
      map,
      heroController,
    };

    const controller = this.controller = new PlaySceneController(this.scene, data);
    this.add(controller);
  }

  private createHeroController(): HeroController {
    const heroController = new HeroController(this.scene);

    const mapWidth: number = LEVEL_CONFIG.map[0].length * CONFIG.cellWidth;
    const mapHeight: number = LEVEL_CONFIG.map.length * CONFIG.cellHeight;
    const mapLeftUpperCorner: any = {
      x: -mapWidth * 0.5,
      y: -mapHeight * 0.5,
    };

    heroController.x = mapLeftUpperCorner.x;
    heroController.y = mapLeftUpperCorner.y;

    return heroController;
  }
}
