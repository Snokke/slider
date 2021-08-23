import CONFIG from "../game/play-scene/config";
import { CELL_TYPE, LEVEL_CONFIG } from "../game/play-scene/map/map-config";

const getCellXY = (cell: Cell): Point => {
  const x: number = cell.column * CONFIG.cellWidth + CONFIG.cellWidth * 0.5;
  const y: number = cell.row * CONFIG.cellHeight + CONFIG.cellHeight * 0.5;

  return new Phaser.Geom.Point(x, y);
};

const getCellType = (cell: Cell): CELL_TYPE => {
  const index: number = LEVEL_CONFIG.map[cell.row][cell.column];

  const indexToCellType = {
    0: CELL_TYPE.empty,
    1: CELL_TYPE.wall,
  };

  return indexToCellType[index];
};


export { getCellXY, getCellType };
