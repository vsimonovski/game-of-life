import { Grid, GridSize, NeighbourCellCoordinates } from '../types/Grid';

export const initialiseGrid = (gridSize: GridSize): Grid => {
  return Array.from({ length: gridSize.rows }, () =>
    Array.from({ length: gridSize.cols }, () => false)
  );
};

export const updateGridCell = (
  grid: Grid,
  row: number,
  col: number,
  value: boolean
): Grid => {
  return grid.map((rows, rowId) =>
    row === rowId
      ? rows.map((cell, colId) => (col === colId ? value : cell))
      : rows
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
