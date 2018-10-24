import * as React from 'react';

interface Props {
  children: (params: any) => React.ReactNode;
  [prop: string]: any;
}

class Compose extends React.Component<Props> {
  public render() {
    const { children, ...rest } = this.props;
    if (children) {
      return children(rest);
    }
    return null;
  }
}

export default Compose;
