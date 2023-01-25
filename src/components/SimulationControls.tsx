import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  SIMULATION_TOGGLE,
  SIMULATION_RESET,
  SIMULATION_RANDOMISE,
  SIMULATION_NEXT,
  selectSimulationStatus,
  selectNumOfLivingCellsStatus,
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
  const hasLivingCells = useSelector(selectNumOfLivingCellsStatus);
  const isSimulationRunning = useSelector(selectSimulationStatus);

  return (
    <Container>
      <Button
        dataCy="run-btn"
        text={`${isSimulationRunning ? 'Stop' : 'Start'} simulation`}
        isDisabled={!hasLivingCells && !isSimulationRunning}
        onClick={() => dispatch(SIMULATION_TOGGLE())}
      />
      <Button
        dataCy="next-btn"
        text={'Next generation'}
        isDisabled={isSimulationRunning || !hasLivingCells}
        onClick={() => dispatch(SIMULATION_NEXT())}
      />
      <Button
        dataCy="randomise-btn"
        text={'Randomise'}
        isDisabled={isSimulationRunning}
        onClick={() => dispatch(SIMULATION_RANDOMISE())}
      />
      <Button
        dataCy="reset-btn"
        text={'Reset'}
        isDisabled={!hasLivingCells && !isSimulationRunning}
        onClick={() => dispatch(SIMULATION_RESET())}
      />
    </Container>
  );
};
export default SimulationControls;
