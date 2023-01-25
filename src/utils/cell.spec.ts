import { Cells, GridSize } from 'types';
import { initialiseCells, countNeighbourCells } from './cell';

describe('initialiseCells util', () => {
  const mockGridSize: GridSize = { rows: 3, cols: 3 };

  it('should initialise all cells false', () => {
    const numOfLiveCells = initialiseCells(mockGridSize)
      .flatMap((cell) => cell)
      .filter((cell) => cell).length;

    expect(numOfLiveCells).toBe(0);
  });

  it('should return correct number of cells', () => {
    const numOfCells = initialiseCells(mockGridSize).flatMap(
      (cell) => cell
    ).length;
    const rectangleGridCells = initialiseCells({ rows: 5, cols: 10 }).flatMap(
      (cell) => cell
    );
    const zeroCells = initialiseCells({ rows: 0, cols: 0 }).flatMap(
      (cell) => cell
    );

    expect(numOfCells).toBe(9);
    expect(rectangleGridCells.length).toBe(50);
    expect(zeroCells.length).toBe(0);
  });
});

describe('countNeighbourCells util', () => {
  const mockGridSize: GridSize = { rows: 3, cols: 3 };
  const mockCells = [
    [false, true, false],
    [true, false, true],
    [false, true, false],
  ];
  const mockDeadCells = [
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ];

  it('should return correct number of live neighbours', () => {
    const neighbourCellCountWrapper = (
      cells: Cells,
      rowId: number,
      colId: number
    ) => countNeighbourCells(mockGridSize, cells, rowId, colId);

    expect(neighbourCellCountWrapper(mockCells, 1, 1)).toBe(4);
    expect(neighbourCellCountWrapper(mockCells, 0, 1)).toBe(3);
    expect(neighbourCellCountWrapper(mockCells, 1, 0)).toBe(3);
    expect(neighbourCellCountWrapper(mockDeadCells, 1, 1)).toBe(0);
  });
});
