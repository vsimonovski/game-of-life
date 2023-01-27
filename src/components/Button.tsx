import { FC } from 'react';
import styled from 'styled-components';
import { device } from '@/style';

const StyledButton = styled.button`
  border-radius: var(--size-xs);
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1.6em;
  font-weight: 700;
  background-color: var(--color-dark);
  cursor: pointer;
  transition: border-color 0.25s;
  height: 43px;
  color: ${(props) => (props.disabled ? 'var(--color-gray)' : 'inherit')};
  &:hover {
    border-color: var(--color-accent);
  }

  @media ${device.tablet} {
    width: 100%;
    margin: 8px auto;
  }

  @media ${device.mobile} {
    width: 100%;
    font-size: 0.8rem;
  }
`;

interface ButtonProps {
  isDisabled: boolean;
  onClick: () => void;
  dataCy: string;
  text: string;
}

export const Button: FC<ButtonProps> = ({
  isDisabled,
  onClick,
  dataCy,
  text,
}) => {
  return (
    <StyledButton disabled={isDisabled} onClick={onClick} data-cy={dataCy}>
      {text}
    </StyledButton>
  );
};
