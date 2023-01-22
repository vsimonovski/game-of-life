import React from 'react';
import styled from 'styled-components';
import SimulationControls from 'components/SimulationControls';
import CellContainer from 'components/CellContainer';
import SimulationStats from 'components/SimulationStats';

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

const StyledHeader = styled.h1`
  font-size: 3rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export function App() {
  return (
    <>
      <StyledHeader>Game of Life</StyledHeader>
      <Container>
        <CellContainer />
        <SimulationControls />
        <SimulationStats />
      </Container>
    </>
  );
}
