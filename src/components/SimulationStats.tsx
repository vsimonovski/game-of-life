import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  selectNumOfGenerations,
  selectNumOfLivingCells,
} from 'components/simulationSlice';
import { device } from 'globalStyles';

const Container = styled.section`
  display: flex;
  margin: 0 auto;

  @media ${device.mobile} {
    flex-direction: column;
  }
`;

const StyledParagraph = styled.p`
  font-weight: 500;
  font-size: 1.6em;
  margin: 0;
  padding: var(--size-sm);

  @media ${device.mobile} {
    padding: var(--size-xxs);
    text-align: center;
  }
`;

const SimulationStats = () => {
  const numOfLivingCells = useSelector(selectNumOfLivingCells);
  const numOfGenerations = useSelector(selectNumOfGenerations);
  return (
    <Container>
      <StyledParagraph>Generations: {numOfGenerations}</StyledParagraph>
      <StyledParagraph>Living Cells: {numOfLivingCells}</StyledParagraph>
    </Container>
  );
};
export default SimulationStats;
