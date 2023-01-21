import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  selectNumOfGenerations,
  selectNumOfLivingCells,
} from 'components/gridSlice';

const Container = styled.section`
  display: flex;
  margin: 0 auto;
`;

const StyledParagraph = styled.p`
  font-weight: 500;
  font-size: 18px;
  margin: 0;
  padding: 16px;
`;

const GridStats = () => {
  const numOfLivingCells = useSelector(selectNumOfLivingCells);
  const numOfGenerations = useSelector(selectNumOfGenerations);
  return (
    <Container>
      <StyledParagraph>Generations: {numOfGenerations}</StyledParagraph>
      <StyledParagraph>Living Cells: {numOfLivingCells}</StyledParagraph>
    </Container>
  );
};
export default GridStats;
