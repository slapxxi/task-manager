import * as React from 'react';
import styled from 'styled-components';

interface Props {
  value?: string;
  onChange?: (value: string) => void;
  [prop: string]: any;
}

class TextArea extends React.Component<Props, {}> {
  public ref = React.createRef<HTMLTextAreaElement>();

  public componentDidMount() {
    this.adjustHeight();
  }

  public handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.adjustHeight();
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    }
  };

  public adjustHeight() {
    const ref = this.ref.current;
    if (ref) {
      if (ref.scrollHeight === 0) {
        return;
      }
      ref.style.height = '1px';
      ref.style.height = `${ref.scrollHeight}px`;
    }
  }

  public render() {
    return (
      <Container
        {...this.props}
        onChange={this.handleChange}
        innerRef={this.ref}
      />
    );
  }
}

const Container = styled.textarea`
  overflow: visible;
  box-sizing: border-box;
  border: 0;
  line-height: 1.4;
  height: auto;
  padding: 0;
  margin: 0;
  color: inherit;
`;

export default TextArea;
