import React from 'react';
import styled from 'styled-components';
import GridControls from 'components/GridControls';
import GridContainer from 'components/GridContainer';
import GridStats from 'components/GridStats';

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
        <GridContainer />
        <GridControls />
        <GridStats />
      </Container>
    </>
  );
}
