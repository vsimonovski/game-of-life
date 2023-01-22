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

const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: 16px;
  @media (max-width: 768px) {
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
      <Button isDisabled={isBtnDisabled} onClick={handleSimulationStatusChange}>
        {isSimulationRunning ? 'Stop' : 'Start'} simulation
      </Button>
      <Button isDisabled={isBtnDisabled} onClick={handleSimulationReset}>
        Reset
      </Button>
      <Button
        isDisabled={isSimulationRunning}
        onClick={handleSimulationRandomise}
      >
        Randomise
      </Button>
    </Container>
  );
};
export default SimulationControls;