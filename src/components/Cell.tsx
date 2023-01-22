import React, { memo, FC } from 'react';
import styled from 'styled-components';

const StyledCell = styled.div`
  width: 15px;
  height: 15px;
  background-color: #fff;
  background-color: ${({ isAlive }: { isAlive: boolean }) =>
    isAlive ? '#f1c40f' : '#242424'};
  transition: background-color 0.4s ease-out;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 10px;
    height: 10px;
  }

  @media (max-width: 480px) {
    width: 6px;
    height: 6px;
  }
`;

interface CellProps {
  isAlive: boolean;
  rowId: number;
  colId: number;
  handleCellClick: (rowId: number, coldId: number) => void;
}

const Cell: FC<CellProps> = ({ isAlive, handleCellClick, rowId, colId }) => (
  <StyledCell isAlive={isAlive} onClick={() => handleCellClick(rowId, colId)} />
);

export default memo(Cell);
