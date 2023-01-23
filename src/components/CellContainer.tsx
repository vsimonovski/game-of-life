import React, { useEffect, useCallback, FC } from 'react';
import styled from 'styled-components';
import { countNeighbourCells } from 'utils/cell';
import { Cells, GridSize } from 'types';
import { GRID_SIZE, NEIGHBOUR_CELL_COORDINATES, INTERVAL_MS } from 'config';
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

interface CellContainerProps {
  cells: Cells;
  isSimulationRunning: boolean;
  setCells: React.Dispatch<React.SetStateAction<Cells>>;
  setNumOfGeneration: React.Dispatch<React.SetStateAction<number>>;
}

const CellContainer: FC<CellContainerProps> = ({
  cells,
  setCells,
  isSimulationRunning,
  setNumOfGeneration,
}) => {
  const onCellClick = useCallback(
    (targetRowId: number, targetColId: number) => {
      setCells((prevCellState) =>
        prevCellState.map((rows, rowId) => {
          if (rowId === targetRowId) {
            return rows.map((cols, colId) =>
              colId === targetColId ? !prevCellState[rowId][colId] : cols
            );
          }
          return rows;
        })
      );
    },
    [setCells]
  );

  useEffect(() => {
    if (!isSimulationRunning) return;

    const simulationInterval = setInterval(() => {
      setNumOfGeneration((prevNumOfGen) => prevNumOfGen + 1);

      setCells((prevCellState) =>
        prevCellState.map((rows, rowId) =>
          rows.map((cols, colId) => {
            const count = countNeighbourCells(
              NEIGHBOUR_CELL_COORDINATES,
              GRID_SIZE,
              prevCellState,
              rowId,
              colId
            );

            if (prevCellState[rowId][colId] && (count < 2 || count > 3)) {
              return !prevCellState[rowId][colId];
            }

            if (!prevCellState[rowId][colId] && count === 3) {
              return !prevCellState[rowId][colId];
            }

            return cols;
          })
        )
      );
    }, INTERVAL_MS);

    return () => clearInterval(simulationInterval);
  }, [isSimulationRunning, setCells, setNumOfGeneration]);

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
