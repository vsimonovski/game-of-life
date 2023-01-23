import React, { useState } from 'react';
import styled from 'styled-components';
import SimulationControls from 'components/SimulationControls';
import CellContainer from 'components/CellContainer';
import SimulationStats from 'components/SimulationStats';
import { initialiseCells } from 'utils/cell';
import { GRID_SIZE } from 'config';

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

const StyledHeader = styled.h1`
  font-size: 4.8em;
  text-align: center;
`;

export function App() {
  const [cells, setCells] = useState(() => initialiseCells(GRID_SIZE));
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [numOfGeneration, setNumOfGeneration] = useState(0);

  const numOfLiveCells = cells.flat().filter((cell) => cell).length;

  const handleSimulationReset = () => {
    setCells(initialiseCells(GRID_SIZE));
    setNumOfGeneration(0);
  };

  const handleSimulationRandomise = () => {
    setCells(initialiseCells(GRID_SIZE, true));
  };

  const handleSimulationRun = () => {
    setIsSimulationRunning(!isSimulationRunning);
  };

  return (
    <>
      <StyledHeader data-cy="title">Game of Life</StyledHeader>
      <Container>
        <CellContainer
          cells={cells}
          isSimulationRunning={isSimulationRunning}
          setCells={setCells}
          setNumOfGeneration={setNumOfGeneration}
        />
        <SimulationControls
          isSimulationRunning={isSimulationRunning}
          onSimulationReset={handleSimulationReset}
          onSimulationRandomise={handleSimulationRandomise}
          onSimulationRun={handleSimulationRun}
          numOfLiveCells={numOfLiveCells}
        />
        <SimulationStats
          numOfLiveCells={numOfLiveCells}
          numOfGeneration={numOfGeneration}
        />
      </Container>
    </>
  );
}
