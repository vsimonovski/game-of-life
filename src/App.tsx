import styled from 'styled-components';
import {
  SimulationControls,
  CellGrid,
  SimulationStats,
} from '@/features/simulation';
import { Provider } from 'react-redux';
import { store } from '@/store';

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

const StyledHeader = styled.h1`
  font-size: 4.8em;
  text-align: center;
`;

export function App() {
  return (
    <>
      <StyledHeader data-cy="title">Game of Life</StyledHeader>
      <Container>
        <Provider store={store}>
          <CellGrid />
          <SimulationControls />
          <SimulationStats />
        </Provider>
      </Container>
    </>
  );
}
