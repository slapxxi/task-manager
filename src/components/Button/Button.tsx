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
  border: 1px solid lightgrey;
  border-radius: 4px;
  padding: 5px 10px;
  background: 0;
`;

export default Button;
