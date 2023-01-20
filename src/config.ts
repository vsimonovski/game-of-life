import { CoordinateValue } from './types/Grid';

export const GRID_SIZE = 20;
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
