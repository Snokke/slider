import { getCellType, getCellXY } from "../../../helpers/map-helper";
import CONFIG from "../config";
import { CELL_TYPE, LEVEL_CONFIG } from "../map/map-config";
import Hero from "./hero";
import { HERO_CONFIG, HERO_STATE } from "./hero-config";

export default class HeroController extends Phaser.GameObjects.Container {
  private hero: Hero;

  constructor(scene: Phaser.Scene) {
    super(scene);

    this.init();
  }

  public update(dt: number): void {
    switch (this.hero.currentState) {
      case HERO_STATE.MoveTop:
        this.onMoveTop(dt);
        break;

      case HERO_STATE.MoveDown:
        this.onMoveDown(dt);
        break;

      case HERO_STATE.MoveLeft:
        this.onMoveLeft(dt);
        break;

      case HERO_STATE.MoveRight:
        this.onMoveRight(dt);
        break;

      default:
        break;
    }

    this.updateCurrentMapPosition();
  }

  public getHeroCell(): Cell {
    return this.hero.currentMapPosition;
  }

  private onMoveTop(dt: number): void {
    this.hero.y -= HERO_CONFIG.speed * dt * 0.001;

    if (this.hero.currentMapPosition.row > 0) {
      const topCell: Cell = {
        column: this.hero.currentMapPosition.column,
        row: this.hero.currentMapPosition.row - 1,
      };

      const cellPosition: Point = getCellXY(topCell);
      const cellType: CELL_TYPE = getCellType(topCell);

      if (cellType === CELL_TYPE.wall && this.hero.y - CONFIG.cellHeight * 0.5 <= cellPosition.y + CONFIG.cellHeight * 0.5) {
        this.hero.y = cellPosition.y + CONFIG.cellHeight;
        this.hero.currentState = HERO_STATE.Idle;
      }
    }

    const topBorder: number = CONFIG.cellHeight * 0.5;

    if (this.hero.y <= topBorder) {
      this.hero.y = topBorder;
      this.hero.currentState = HERO_STATE.Idle;
    }
  }

  private onMoveDown(dt: number): void {
    this.hero.y += HERO_CONFIG.speed * dt * 0.001;

    if (this.hero.currentMapPosition.row < LEVEL_CONFIG.map.length) {
      const bottomCell: Cell = {
        column: this.hero.currentMapPosition.column,
        row: this.hero.currentMapPosition.row + 1,
      };

      const cellPosition: Point = getCellXY(bottomCell);
      const cellType: CELL_TYPE = getCellType(bottomCell);

      if (cellType === CELL_TYPE.wall && this.hero.y + CONFIG.cellHeight * 0.5 >= cellPosition.y - CONFIG.cellHeight * 0.5) {
        this.hero.y = cellPosition.y - CONFIG.cellHeight;
        this.hero.currentState = HERO_STATE.Idle;
      }
    }

    const bottomBorder: number = CONFIG.cellHeight * LEVEL_CONFIG.map.length;

    if (this.hero.y + CONFIG.cellWidth * 0.5 >= bottomBorder) {
      this.hero.y = bottomBorder - CONFIG.cellWidth * 0.5;
      this.hero.currentState = HERO_STATE.Idle;
    }
  }

  private onMoveLeft(dt: number): void {
    this.hero.x -= HERO_CONFIG.speed * dt * 0.001;

    if (this.hero.currentMapPosition.column > 0) {
      const leftCell: Cell = {
        column: this.hero.currentMapPosition.column - 1,
        row: this.hero.currentMapPosition.row,
      };

      const cellPosition: Point = getCellXY(leftCell);
      const cellType: CELL_TYPE = getCellType(leftCell);

      if (cellType === CELL_TYPE.wall && this.hero.x - CONFIG.cellWidth * 0.5 <= cellPosition.x + CONFIG.cellWidth * 0.5) {
        this.hero.x = cellPosition.x + CONFIG.cellWidth;
        this.hero.currentState = HERO_STATE.Idle;
      }
    }

    const leftBorder: number = CONFIG.cellWidth * 0.5;

    if (this.hero.x <= leftBorder) {
      this.hero.x = leftBorder;
      this.hero.currentState = HERO_STATE.Idle;
    }
  }

  private onMoveRight(dt: number): void {
    this.hero.x += HERO_CONFIG.speed * dt * 0.001;

    if (this.hero.currentMapPosition.column < LEVEL_CONFIG.map[0].length) {
      const rightCell: Cell = {
        column: this.hero.currentMapPosition.column + 1,
        row: this.hero.currentMapPosition.row,
      };

      const cellPosition: Point = getCellXY(rightCell);
      const cellType: CELL_TYPE = getCellType(rightCell);

      if (cellType === CELL_TYPE.wall && this.hero.x + CONFIG.cellWidth * 0.5 >= cellPosition.x - CONFIG.cellWidth * 0.5) {
        this.hero.x = cellPosition.x - CONFIG.cellWidth;
        this.hero.currentState = HERO_STATE.Idle;
      }
    }

    const rightBorder: number = CONFIG.cellWidth * LEVEL_CONFIG.map[0].length;

    if (this.hero.x + CONFIG.cellWidth * 0.5 >= rightBorder) {
      this.hero.x = rightBorder - CONFIG.cellWidth * 0.5;
      this.hero.currentState = HERO_STATE.Idle;
    }
  }

  private updateCurrentMapPosition(): void {
    const heroCell: Cell = {
      column: Math.floor(this.hero.x / CONFIG.cellWidth),
      row: Math.floor(this.hero.y / CONFIG.cellHeight),
    };

    this.hero.currentMapPosition = heroCell;
  }

  public start(): void {
    this.hero.x = LEVEL_CONFIG.startPosition.column * CONFIG.cellWidth + CONFIG.cellWidth * 0.5;
    this.hero.y = LEVEL_CONFIG.startPosition.row * CONFIG.cellHeight + CONFIG.cellHeight * 0.5;
  }

  private init(): void {
    this.initHero();
  }

  private initHero(): void {
    const hero = this.hero = new Hero(this.scene);
    this.add(hero);
  }
}
