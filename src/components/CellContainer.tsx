import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { countNeighbourCells } from 'utils/cell';
import { GridSize } from 'types';
import { GRID_SIZE, NEIGHBOUR_CELL_COORDINATES, INTERVAL_MS } from 'config';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSimulationStatus,
  selectCells,
  SET_CELL_VALUE,
  INCREASE_GENERATION_NUM,
} from 'components/simulationSlice';
import Cell from 'components/Cell';

const Container = styled.section`
  display: grid;
  margin: 0 auto;
  grid-template-columns: ${({ gridSize }: { gridSize: GridSize }) =>
    `repeat(${gridSize.cols}, 1fr);`};
  grid-template-rows: ${({ gridSize }: { gridSize: GridSize }) =>
    `repeat(${gridSize.rows}, 1fr);`};
  border: 1px solid #555;
  grid-gap: 1px;
  background-color: #555;
  width: fit-content;
`;

const CellContainer = () => {
  const dispatch = useDispatch();
  const isSimulationRunning = useSelector(selectSimulationStatus);
  const cells = useSelector(selectCells);

  const onCellClick = useCallback(
    (rowId: number, colId: number) => {
      dispatch(SET_CELL_VALUE(rowId, colId));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!isSimulationRunning) return;

    const simulationInterval = setInterval(() => {
      dispatch(INCREASE_GENERATION_NUM());

      cells.forEach((rows, rowId) =>
        rows.forEach((_, colId) => {
          const count = countNeighbourCells(
            NEIGHBOUR_CELL_COORDINATES,
            GRID_SIZE,
            cells,
            rowId,
            colId
          );

          if (cells[rowId][colId] && (count < 2 || count > 3))
            dispatch(SET_CELL_VALUE(rowId, colId));

          if (!cells[rowId][colId] && count === 3)
            dispatch(SET_CELL_VALUE(rowId, colId));
        })
      );
    }, INTERVAL_MS);

    return () => clearInterval(simulationInterval);
  }, [isSimulationRunning, cells, dispatch]);

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
