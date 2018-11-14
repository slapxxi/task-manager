import React from 'react';
import styled from 'styled-components';

interface Props {
  [index: string]: any;
}

function Button(props: Props) {
  return <Container {...props}>{props.children}</Container>;
}

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  border: 0;
  padding: 10px 15px;
  background: 0;
  color: #778;
`;

export default Button;
