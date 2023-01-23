import React, { FC } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { device } from 'globalStyles';
import { Cells } from 'types';

const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: var(--size-sm);
  @media ${device.tablet} {
    flex-direction: column;
  }
`;

interface SimulationControlsProps {
  onSimulationReset: () => void;
  onSimulationRandomise: () => void;
  onSimulationRun: () => void;
  isSimulationRunning: boolean;
  numOfLiveCells: number;
}

const SimulationControls: FC<SimulationControlsProps> = ({
  onSimulationReset,
  onSimulationRandomise,
  onSimulationRun,
  isSimulationRunning,
  numOfLiveCells,
}) => {
  const isBtnDisabled = !numOfLiveCells && !isSimulationRunning;

  return (
    <Container>
      <Button
        dataCy="run-btn"
        onClick={onSimulationRun}
        isDisabled={isBtnDisabled}
      >
        {isSimulationRunning ? 'Stop' : 'Start'} simulation
      </Button>
      <Button
        dataCy="reset-btn"
        isDisabled={isBtnDisabled}
        onClick={onSimulationReset}
      >
        Reset
      </Button>
      <Button
        dataCy="randomise-btn"
        isDisabled={isSimulationRunning}
        onClick={onSimulationRandomise}
      >
        Randomise
      </Button>
    </Container>
  );
};
export default SimulationControls;
