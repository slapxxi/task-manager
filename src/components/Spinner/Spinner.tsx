import React from 'react';
import styled, { keyframes } from 'styled-components';

interface Props {
  size?: number;
}

function Spinner({ size = 16 }: Props) {
  return <StyledSpan size={size} />;
}

const animation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledSpan = styled.div`
  display: inline-block;
  width: ${({ size }) => size + 24}px;
  height: ${({ size }) => size + 24}px;

  &::after {
    content: ' ';
    display: block;
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    margin: 1px;
    border-radius: 50%;
    border: 2px solid #000;
    border-color: #000 transparent #000 transparent;
    animation: ${animation} 1.2s linear infinite;
  }
`;
export default Spinner;
