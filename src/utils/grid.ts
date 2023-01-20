export const initialiseGrid = (size: number): boolean[][] => {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => false)
  );
};

export const updateGridCell = (
  grid: boolean[][],
  row: number,
  col: number,
  value: boolean
): boolean[][] => {
  return grid.map((rows, rowId) =>
    row === rowId
      ? rows.map((cell, colId) => (col === colId ? value : cell))
      : rows
  );
};
