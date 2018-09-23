import * as React from 'react';
import styled from 'styled-components';

interface Props {
  [index: string]: any;
}

function Button(props: Props) {
  return <Container {...props}>{props.children}</Container>;
}

const Container = styled.button`
  display: block;
  box-sizing: border-box;
  width: 100%;
  border: 2px solid #cacacf;
  padding: 10px 15px;
  background: 0;
  color: #778;
`;

export default Button;
