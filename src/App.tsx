import React, { useState } from 'react';
import styled from 'styled-components';
import { GRID_SIZE } from './config';
import { initialiseGrid, updateGridCell } from './utils/grid';

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(10, 20px);
  border: 1px solid black;
  grid-gap: 1px;
  background-color: #333;
`;

const Cell = styled.div`
  width: 20px;
  height: 20px;
  background-color: #fff;
  background-color: ${(props: { isAlive: boolean }) =>
    props.isAlive ? '#9b59b6' : '#fff'};
`;

export function App() {
  const [grid, setGrid] = useState(() => initialiseGrid(GRID_SIZE));

  return (
    <Container>
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
  );
}
