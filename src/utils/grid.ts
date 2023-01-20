import { Grid, NeighbourCellCoordinates } from '../types/Grid';

export const initialiseGrid = (size: number): Grid => {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => false)
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
  gridSize: number,
  grid: Grid,
  row: number,
  col: number
): number => {
  return neighbourCellCoordinates.reduce((count, [x, y]) => {
    const currRow = (x + row + gridSize) % gridSize;
    const currCol = (y + col + gridSize) % gridSize;
    return count + Number(grid[currRow][currCol]);
  }, 0);
};
