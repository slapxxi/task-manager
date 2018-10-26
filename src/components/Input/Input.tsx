import * as React from 'react';
import styled from 'styled-components';

interface Props {
  value: string;
  forwardedRef?: React.Ref<any>;
  [prop: string]: any;
}

function Input({ forwardedRef, ...rest }: Props) {
  return <StyledInput ref={forwardedRef} {...rest} />;
}

const StyledInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  margin-right: 2px;
  border: 0;
  appearance: none;
`;

export default React.forwardRef((props: Props, ref) => (
  <Input {...props} forwardedRef={ref} />
));
