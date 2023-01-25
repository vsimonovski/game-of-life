import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  selectNumOfGenerations,
  selectNumOfLivingCells,
} from 'components/simulationSlice';
import { device } from 'globalStyles';
import Counter from './Counter';

const Container = styled.section`
  display: flex;
  margin: 0 auto;

  @media ${device.mobile} {
    flex-direction: column;
  }
`;

const SimulationStats = () => {
  const numOfLivingCells = useSelector(selectNumOfLivingCells);
  const numOfGenerations = useSelector(selectNumOfGenerations);
  return (
    <Container>
      <Counter
        dataCy="generations-label"
        label="Generations"
        count={numOfGenerations}
      />
      <Counter
        dataCy="living-cells-label"
        label="Living Cells"
        count={numOfLivingCells}
      />
    </Container>
  );
};
export default SimulationStats;
