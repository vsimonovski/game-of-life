import { CoordinateValue, GridSize } from 'types';

export const GRID_SIZE: GridSize = {
  rows: 20,
  cols: 40,
};
export const INTERVAL_MS = 100;
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

// Decrease value to get more cells and vice versa
// Value must be compatible with Math.random(), 0 >= value < 1
export const RANDOM_FACTOR = 0.9;
