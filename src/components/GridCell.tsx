import React, { memo, FC } from 'react';
import styled from 'styled-components';

const Cell = styled.div`
  width: 20px;
  height: 20px;
  background-color: #fff;
  background-color: ${({ isAlive }: { isAlive: boolean }) =>
    isAlive ? '#9b59b6' : '#fff'};
  transition: background-color 0.2s ease;
`;

interface GridCellProps {
  isAlive: boolean;
  rowId: number;
  colId: number;
  handleCellClick: (rowId: number, coldId: number) => void;
}

const GridCell: FC<GridCellProps> = ({
  isAlive,
  handleCellClick,
  rowId,
  colId,
}) => {
  return (
    <Cell
      isAlive={isAlive}
      onClick={() => handleCellClick(rowId, colId)}
    ></Cell>
  );
};
export default memo(GridCell);
