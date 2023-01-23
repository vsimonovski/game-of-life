import React, { FC } from 'react';
import styled from 'styled-components';
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

interface SimulationStatsProps {
  numOfLiveCells: number;
  numOfGeneration: number;
}

const SimulationStats: FC<SimulationStatsProps> = ({
  numOfLiveCells,
  numOfGeneration,
}) => {
  return (
    <Container>
      <StyledParagraph data-cy="generations-label">
        Generations: {numOfGeneration}
      </StyledParagraph>
      <StyledParagraph data-cy="living-cells-label">
        Living Cells: {numOfLiveCells}
      </StyledParagraph>
    </Container>
  );
};
export default SimulationStats;
