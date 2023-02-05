import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  selectNumOfLivingCellsStatus,
  SIMULATION_NEXT,
  SIMULATION_RANDOMISE,
  SIMULATION_RESET,
} from '@/features/simulation';
import { Button } from '@/components';
import { device } from '@/style';
import { INTERVAL_MS } from '@/config';

const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: var(--size-sm);
  @media ${device.tablet} {
    flex-direction: column;
  }
`;

export const SimulationControls = () => {
  const dispatch = useDispatch();
  const [isSimulationRunning, setSimulationRunning] = useState(false);
  const hasLivingCells = useSelector(selectNumOfLivingCellsStatus);

  const handleResetClick = () => {
    dispatch(SIMULATION_RESET());
    setSimulationRunning(false);
  };

  useEffect(() => {
    if (!isSimulationRunning) return;

    const simulationInterval = setInterval(() => {
      dispatch(SIMULATION_NEXT());
    }, INTERVAL_MS);

    return () => clearInterval(simulationInterval);
  }, [isSimulationRunning, dispatch]);

  return (
    <Container>
      <Button
        dataCy="run-btn"
        text={`${isSimulationRunning ? 'Stop' : 'Start'} simulation`}
        isDisabled={!hasLivingCells && !isSimulationRunning}
        onClick={() => setSimulationRunning(!isSimulationRunning)}
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
        onClick={handleResetClick}
      />
    </Container>
  );
};
