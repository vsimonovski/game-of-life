import { memo, FC } from 'react';
import styled from 'styled-components';
import { device } from '@/style';

const StyledCell = styled.div`
  width: 15px;
  height: 15px;
  background-color: ${({ isAlive }: { isAlive: boolean }) =>
    isAlive ? 'var(--color-accent)' : 'var(--color-bg)'};
  transition: background-color 0.4s ease-out;
  cursor: pointer;

  @media ${device.tablet} {
    width: 10px;
    height: 10px;
  }

  @media ${device.mobile} {
    width: 6px;
    height: 6px;
  }
`;

interface CellProps {
  isAlive: boolean;
  rowId: number;
  colId: number;
  onClick: (rowId: number, coldId: number) => void;
}

const Cell: FC<CellProps> = ({ isAlive, onClick, rowId, colId }) => (
  <StyledCell
    data-cy="cell"
    isAlive={isAlive}
    onClick={() => onClick(rowId, colId)}
  />
);

export const MemoizedCell = memo(Cell);
