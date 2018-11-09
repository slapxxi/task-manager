import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface Props {
  value?: string;
  onChange?: (value: string) => void;
  [prop: string]: any;
}

function Textarea({ value, onChange, ...rest }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(adjustHeight, [value]);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (onChange) {
      onChange(e.target.value);
    }
  }

  function handleFocus() {
    const length = value ? value.length * 2 : 0;
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.setSelectionRange(length, length);
      }
    }, 1);
  }

  function adjustHeight() {
    const ref = textareaRef.current;
    if (ref) {
      if (ref.scrollHeight === 0) {
        return;
      }
      ref.style.height = '1px';
      ref.style.height = `${ref.scrollHeight}px`;
    }
  }

  return (
    <StyledTextarea
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      // @ts-ignore
      ref={textareaRef}
      {...rest}
    />
  );
}

const StyledTextarea = styled.textarea`
  overflow: visible;
  box-sizing: border-box;
  width: 100%;
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
