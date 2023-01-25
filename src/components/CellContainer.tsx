import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { GridSize } from 'types';
import { GRID_SIZE, INTERVAL_MS } from 'config';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCells,
  CELL_TOGGLE,
  SIMULATION_NEXT,
  selectSimulationStatus,
} from 'components/simulationSlice';
import Cell from 'components/Cell';

const Container = styled.section`
  display: grid;
  margin: 0 auto;
  grid-template-columns: ${({ gridSize }: { gridSize: GridSize }) =>
    `repeat(${gridSize.cols}, 1fr);`};
  grid-template-rows: ${({ gridSize }: { gridSize: GridSize }) =>
    `repeat(${gridSize.rows}, 1fr);`};
  border: 1px solid var(--color-gray-100);
  grid-gap: 1px;
  background-color: var(--color-gray-100);
  width: fit-content;
`;

const CellContainer = () => {
  const dispatch = useDispatch();
  const cells = useSelector(selectCells);
  const isSimulationRunning = useSelector(selectSimulationStatus);

  const onCellClick = useCallback(
    (rowId: number, colId: number) => {
      dispatch(CELL_TOGGLE(rowId, colId));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!isSimulationRunning) return;

    const simulationInterval = setInterval(() => {
      dispatch(SIMULATION_NEXT());
    }, INTERVAL_MS);

    return () => clearInterval(simulationInterval);
  }, [isSimulationRunning, dispatch]);

  return (
    <Container gridSize={GRID_SIZE}>
      {cells.map((rows, rowId) =>
        rows.map((_, colId) => (
          <Cell
            isAlive={cells[rowId][colId]}
            key={`${rowId}${colId}`}
            rowId={rowId}
            colId={colId}
            handleCellClick={onCellClick}
          />
        ))
      )}
    </Container>
  );
};
export default CellContainer;
