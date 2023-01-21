import React, { memo, FC } from 'react';
import styled from 'styled-components';

const Cell = styled.div`
  width: 15px;
  height: 15px;
  background-color: #fff;
  background-color: ${({ isAlive }: { isAlive: boolean }) =>
    isAlive ? '#f1c40f' : '#242424'};
  transition: background-color 0.4s ease-out;
  cursor: pointer;
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
