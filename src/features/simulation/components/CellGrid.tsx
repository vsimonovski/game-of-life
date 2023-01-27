import { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { GRID_SIZE } from '@/config';
import { GridSize } from '../types';
import { CELL_TOGGLE, selectCells } from '../store';
import { MemoizedCell } from './Cell';

const Grid = styled.section`
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

export const CellGrid = () => {
  const dispatch = useDispatch();
  const cells = useSelector(selectCells);

  const handleCellClick = useCallback(
    (rowId: number, colId: number) => {
      dispatch(CELL_TOGGLE(rowId, colId));
    },
    [dispatch]
  );

  return (
    <Grid gridSize={GRID_SIZE}>
      {cells.map((rows, rowId) =>
        rows.map((_, colId) => (
          <MemoizedCell
            isAlive={cells[rowId][colId]}
            key={`${rowId}${colId}`}
            rowId={rowId}
            colId={colId}
            onClick={handleCellClick}
          />
        ))
      )}
    </Grid>
  );
};
