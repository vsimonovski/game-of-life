import { NEIGHBOUR_CELL_COORDINATES, RANDOM_FACTOR } from 'config';
import { Cells, GridSize } from 'types';

export const initialiseCells = (
  gridSize: GridSize,
  isRandomInitialValue?: boolean
): Cells => {
  return Array.from({ length: gridSize.rows }, () =>
    Array.from({ length: gridSize.cols }, () => {
      if (isRandomInitialValue)
        return Math.random() > RANDOM_FACTOR ? true : false;
      return false;
    })
  );
};

export const countNeighbourCells = (
  gridSize: GridSize,
  grid: Cells,
  row: number,
  col: number
): number => {
  return NEIGHBOUR_CELL_COORDINATES.reduce((count, [x, y]) => {
    const currRow = (x + row + gridSize.rows) % gridSize.rows;
    const currCol = (y + col + gridSize.cols) % gridSize.cols;
    return count + Number(grid[currRow][currCol]);
  }, 0);
};
