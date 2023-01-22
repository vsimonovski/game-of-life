import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  selectSimulationStatus,
  SIMULATION_START,
  SIMULATION_PAUSE,
  SIMULATION_RESET,
  SIMULATION_RANDOMISE,
  selectNumOfLivingCells,
} from 'components/simulationSlice';
import Button from './Button';
import { device } from 'globalStyles';

const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: var(--size-sm);
  @media ${device.tablet} {
    flex-direction: column;
  }
`;

const SimulationControls = () => {
  const dispatch = useDispatch();
  const isSimulationRunning = useSelector(selectSimulationStatus);
  const numOfLivingCells = useSelector(selectNumOfLivingCells);
  const isBtnDisabled = !numOfLivingCells && !isSimulationRunning;

  const handleSimulationStatusChange = () => {
    dispatch(!isSimulationRunning ? SIMULATION_START() : SIMULATION_PAUSE());
  };

  const handleSimulationReset = () => {
    dispatch(SIMULATION_RESET());
  };

  const handleSimulationRandomise = () => {
    dispatch(SIMULATION_RANDOMISE());
  };

  return (
    <Container>
      <Button
        dataCy="run-btn"
        isDisabled={isBtnDisabled}
        onClick={handleSimulationStatusChange}
      >
        {isSimulationRunning ? 'Stop' : 'Start'} simulation
      </Button>
      <Button
        dataCy="reset-btn"
        isDisabled={isBtnDisabled}
        onClick={handleSimulationReset}
      >
        Reset
      </Button>
      <Button
        dataCy="randomise-btn"
        isDisabled={isSimulationRunning}
        onClick={handleSimulationRandomise}
      >
        Randomise
      </Button>
    </Container>
  );
};
export default SimulationControls;
