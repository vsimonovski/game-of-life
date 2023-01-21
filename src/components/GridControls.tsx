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
} from 'components/gridSlice';

const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: 16px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StyledButton = styled.button`
  border-radius: 8px;
  width: 200px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1rem;
  font-weight: 700;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
  height: 43px;
  color: ${(props) => (props.disabled ? 'gray' : 'inherit')};
  &:hover {
    border-color: #f1c40f;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: 8px auto;
  }

  @media (max-width: 480px) {
    width: 70%;
    font-size: 0.8rem;
  }
`;

const GridControls = () => {
  const dispatch = useDispatch();
  const isSimulationRunning = useSelector(selectSimulationStatus);
  const numOfLivingCells = useSelector(selectNumOfLivingCells);
  const isBtnDisabled = !numOfLivingCells && !isSimulationRunning;

  const handleGridStatusChange = () => {
    dispatch(!isSimulationRunning ? SIMULATION_START() : SIMULATION_PAUSE());
  };

  const handleGridReset = () => {
    dispatch(SIMULATION_RESET());
  };

  const handleRandomiseGrid = () => {
    dispatch(SIMULATION_RANDOMISE());
  };

  return (
    <Container>
      <StyledButton disabled={isBtnDisabled} onClick={handleGridStatusChange}>
        {isSimulationRunning ? 'Stop' : 'Start'} simulation
      </StyledButton>
      <StyledButton disabled={isBtnDisabled} onClick={handleGridReset}>
        Reset
      </StyledButton>
      <StyledButton
        disabled={isSimulationRunning}
        onClick={handleRandomiseGrid}
      >
        Randomise
      </StyledButton>
    </Container>
  );
};
export default GridControls;
