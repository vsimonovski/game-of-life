import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GRID_SIZE, INTERVAL_MS, NEIGHBOUR_CELL_COORDINATES } from './config';
import {
  countNeighbourCells,
  initialiseGrid,
  updateGridCell,
} from './utils/grid';

const Container = styled.section`
  display: grid;
  grid-template-columns: ${({ gridSize }: { gridSize: number }) =>
    `repeat(${gridSize}, 20px);`};
  border: 1px solid #333;
  grid-gap: 1px;
  background-color: #333;
`;

const Cell = styled.div`
  width: 20px;
  height: 20px;
  background-color: #fff;
  background-color: ${({ isAlive }: { isAlive: boolean }) =>
    isAlive ? '#9b59b6' : '#fff'};
`;

export function App() {
  const [grid, setGrid] = useState(() => initialiseGrid(GRID_SIZE));
  const [isGameRunning, setIsGameRunning] = useState(false);

  useEffect(() => {
    if (!isGameRunning) return;

    const simulationInterval = setInterval(() => {
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
            setGrid((currGrid) => updateGridCell(currGrid, rowId, colId, true));
        })
      );
    }, INTERVAL_MS);

    return () => clearInterval(simulationInterval);
  }, [isGameRunning, grid]);

  return (
    <>
      <button onClick={() => setIsGameRunning(!isGameRunning)}>
        {isGameRunning ? 'Stop Game' : 'Start Game'}
      </button>
      <Container gridSize={GRID_SIZE}>
        {grid.map((rows, rowId) =>
          rows.map((_, colId) => (
            <Cell
              key={`${rowId}${colId}`}
              isAlive={grid[rowId][colId]}
              onClick={() =>
                setGrid(updateGridCell(grid, rowId, colId, !grid[rowId][colId]))
              }
            ></Cell>
          ))
        )}
      </Container>
    </>
  );
}
