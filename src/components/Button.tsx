import React, { FC } from 'react';
import styled from 'styled-components';

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

interface ButtonProps {
  isDisabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const Button: FC<ButtonProps> = ({ isDisabled, onClick, children }) => {
  return (
    <StyledButton disabled={isDisabled} onClick={onClick}>
      {children}
    </StyledButton>
  );
};
export default Button;
