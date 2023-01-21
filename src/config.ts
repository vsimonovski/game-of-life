import { CoordinateValue, GridSize } from './types/Grid';

export const GRID_SIZE: GridSize = {
  rows: 20,
  cols: 50,
};
export const INTERVAL_MS = 200;
export const NEIGHBOUR_CELL_COORDINATES: CoordinateValue[][] = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];
