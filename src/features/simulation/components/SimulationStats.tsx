import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  selectNumOfGenerations,
  selectNumOfLivingCells,
} from '@/features/simulation';
import { device } from '@/style';
import { MemoizedCounter } from '@/components';

const Container = styled.section`
  display: flex;
  margin: 0 auto;

  @media ${device.mobile} {
    flex-direction: column;
  }
`;

export const SimulationStats = () => {
  const numOfLivingCells = useSelector(selectNumOfLivingCells);
  const numOfGenerations = useSelector(selectNumOfGenerations);
  return (
    <Container>
      <MemoizedCounter
        dataCy="generations-label"
        label="Generations"
        count={numOfGenerations}
      />
      <MemoizedCounter
        dataCy="living-cells-label"
        label="Living Cells"
        count={numOfLivingCells}
      />
    </Container>
  );
};
