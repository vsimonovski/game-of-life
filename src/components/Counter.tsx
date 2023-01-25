import React, { memo } from 'react';
import { device } from 'globalStyles';
import { FC } from 'react';
import styled from 'styled-components';

const StyledParagraph = styled.p`
  font-weight: 500;
  font-size: 1.6em;
  margin: 0;
  padding: var(--size-sm);

  @media ${device.mobile} {
    padding: var(--size-xxs);
    text-align: center;
  }
`;

interface CounterProps {
  label: string;
  count: number;
  dataCy: string;
}

const Counter: FC<CounterProps> = ({ label, count, dataCy }) => {
  return (
    <StyledParagraph data-cy={dataCy}>
      {label}: {count}
    </StyledParagraph>
  );
};
export default memo(Counter);
