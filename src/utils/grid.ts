import { RANDOM_FACTOR } from 'config';
import { Grid, GridSize, NeighbourCellCoordinates } from 'types/Grid';

export const initialiseGrid = (
  gridSize: GridSize,
  isRandomInitialValue?: boolean
): Grid => {
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
  grid: Grid,
  row: number,
  col: number
): number => {
  return neighbourCellCoordinates.reduce((count, [x, y]) => {
    const currRow = (x + row + gridSize.rows) % gridSize.rows;
    const currCol = (y + col + gridSize.cols) % gridSize.cols;
    return count + Number(grid[currRow][currCol]);
  }, 0);
};
