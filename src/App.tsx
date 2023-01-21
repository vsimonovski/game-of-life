import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import GridCell from './components/GridCell';
import { GRID_SIZE, INTERVAL_MS, NEIGHBOUR_CELL_COORDINATES } from './config';
import { GridSize } from './types/Grid';
import {
  countNeighbourCells,
  initialiseGrid,
  updateGridCell,
} from './utils/grid';

const Container = styled.section`
  display: grid;
  grid-template-columns: ${({ gridSize }: { gridSize: GridSize }) =>
    `repeat(${gridSize.cols}, 20px);`};
  grid-template-rows: ${({ gridSize }: { gridSize: GridSize }) =>
    `repeat(${gridSize.rows}, 20px);`};
  border: 1px solid #333;
  grid-gap: 1px;
  background-color: #333;
  width: fit-content;
`;

export function App() {
  const [grid, setGrid] = useState(() => initialiseGrid(GRID_SIZE));
  const [isGameRunning, setIsGameRunning] = useState(false);

  useEffect(() => {
    if (!isGameRunning) return;

    const simulationInterval = setInterval(
      () =>
        grid.map((rows, rowId) =>
          rows.map((_, colId) => {
            const count = countNeighbourCells(
              NEIGHBOUR_CELL_COORDINATES,
              GRID_SIZE,
              grid,
              rowId,
              colId
            );

            if (grid[rowId][colId] && (count < 2 || count > 3))
              setGrid((currGrid) =>
                updateGridCell(currGrid, rowId, colId, false)
              );

            if (!grid[rowId][colId] && count === 3)
              setGrid((currGrid) =>
                updateGridCell(currGrid, rowId, colId, true)
              );

            return _;
          })
        ),
      INTERVAL_MS
    );

    return () => clearInterval(simulationInterval);
  }, [isGameRunning, grid]);

  const onCellClick = useCallback((rowId: number, colId: number) => {
    setGrid((currGrid) =>
      updateGridCell(currGrid, rowId, colId, !currGrid[rowId][colId])
    );
  }, []);

  return (
    <>
      <button
        style={{ position: 'absolute', left: 0, top: 0 }}
        onClick={() => setIsGameRunning(!isGameRunning)}
      >
        {isGameRunning ? 'Stop Game' : 'Start Game'}
      </button>
      <Container gridSize={GRID_SIZE}>
        {grid.map((rows, rowId) =>
          rows.map((_, colId) => (
            <GridCell
              isAlive={grid[rowId][colId]}
              key={`${rowId}${colId}`}
              rowId={rowId}
              colId={colId}
              handleCellClick={onCellClick}
            />
          ))
        )}
      </Container>
    </>
  );
}
