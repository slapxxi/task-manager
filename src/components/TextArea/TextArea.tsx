import React from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import styled from 'styled-components';

interface Props {
  value?: string;
  className?: string;
  placeholder?: string;
  onClick?: (e: any) => void;
  onChange?: (value: string) => void;
  'data-testid'?: string;
  [prop: string]: any;
}

function Textarea({ value, onChange, className, onClick, placeholder, ...rest }: Props) {
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (onChange) {
      onChange(e.target.value);
    }
  }

  return (
    <StyledTextarea
      value={value}
      className={className}
      onChange={handleChange}
      onClick={onClick}
      placeholder={placeholder}
      data-testid={rest['data-testid']}
    />
  );
}

// @ts-ignore
const StyledTextarea = styled(TextareaAutosize)`
  overflow: visible;
  box-sizing: border-box;
  height: auto;
  padding: 0;
  border: 0;
  margin: 0;
  background: transparent;
  line-height: 1.4;
  resize: none;
  appearance: none;
`;

export default Textarea;
