import CONFIG from "../config";
import { LEVEL_CONFIG } from "./map-config";

export default class Map extends Phaser.GameObjects.Container {
  private debugCells: any[] = [];

  constructor(scene: Phaser.Scene) {
    super(scene);

    this.init();
  }

  public showDebugCell(cell: Cell): void {
    this.hideAllDebugCells();

    this.debugCells[cell.row][cell.column].visible = true;
  }

  private hideAllDebugCells(): void {
    this.debugCells.forEach((column) => {
      column.forEach((cell) => {
        cell.visible = false;
      });
    });
  }

  private init(): void {
    this.initMap();
    this.initDebugGrid();
    this.initDebugCells();
  }

  private initMap(): void {
    const map = LEVEL_CONFIG.map;
    const rows: number = map.length;
    const columns: number = map[0].length;
    const cellWidth: number = CONFIG.cellWidth;
    const cellHeight: number = CONFIG.cellHeight;

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        const cellType: number = map[row][column];
        if (cellType === 1) {
          const cell: Graphics = this.scene.make.graphics({});
          cell.fillStyle(0x660000, 1);
          cell.fillRect(-cellWidth * 0.5, -cellHeight * 0.5, cellWidth, cellHeight);
          this.add(cell);

          cell.x = -(cellWidth * (columns - 1)) * 0.5 + cellWidth * column;
          cell.y = -(cellHeight * (rows - 1)) * 0.5 + cellHeight * row;
        }
      }
    }
  }

  private initDebugGrid(): void {
    if (!CONFIG.debug) {
      return;
    }

    const map = LEVEL_CONFIG.map;
    const rows: number = map.length;
    const columns: number = map[0].length;
    const cellWidth: number = CONFIG.cellWidth;
    const cellHeight: number = CONFIG.cellHeight;

    for (let row = 0; row <= rows; row += 1) {
      const line: Graphics = this.scene.make.graphics({});
      line.lineStyle(1, 0x0000ff, 1);
      line.lineBetween(-cellWidth * columns * 0.5, -cellHeight * rows * 0.5 + row * cellHeight, cellWidth * columns * 0.5, -cellHeight * rows * 0.5 + row * cellHeight);
      this.add(line);
    }

    for (let column = 0; column <= columns; column += 1) {
      const line: Graphics = this.scene.make.graphics({});
      line.lineStyle(1, 0x0000ff, 1);
      line.lineBetween(-cellWidth * columns * 0.5 + column * cellWidth, -cellHeight * rows * 0.5, -cellWidth * columns * 0.5 + column * cellWidth, cellHeight * rows * 0.5);
      this.add(line);
    }
  }

  private initDebugCells(): void {
    if (!CONFIG.debug) {
      return;
    }

    const map = LEVEL_CONFIG.map;
    const rows: number = map.length;
    const columns: number = map[0].length;
    const cellWidth: number = CONFIG.cellWidth;
    const cellHeight: number = CONFIG.cellHeight;

    for (let row = 0; row < rows; row += 1) {
      (<any>this.debugCells)[row] = [];

      for (let column = 0; column < columns; column += 1) {
        const debugCell: Graphics = this.scene.make.graphics({});
        debugCell.lineStyle(1, 0xff0000);
        debugCell.strokeRect(-cellWidth * 0.5, -cellHeight * 0.5, cellWidth, cellHeight);
        this.add(debugCell);

        debugCell.x = -(cellWidth * (columns - 1)) * 0.5 + cellWidth * column;
        debugCell.y = -(cellHeight * (rows - 1)) * 0.5 + cellHeight * row;

        this.debugCells[row].push(debugCell);

        debugCell.visible = false;
      }
    }
  }
}
