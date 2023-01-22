import { RANDOM_FACTOR } from 'config';
import { Cells, GridSize, NeighbourCellCoordinates } from 'types';

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
  neighbourCellCoordinates: NeighbourCellCoordinates,
  gridSize: GridSize,
  grid: Cells,
  row: number,
  col: number
): number => {
  return neighbourCellCoordinates.reduce((count, [x, y]) => {
    const currRow = (x + row + gridSize.rows) % gridSize.rows;
    const currCol = (y + col + gridSize.cols) % gridSize.cols;
    return count + Number(grid[currRow][currCol]);
  }, 0);
};
