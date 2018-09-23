import * as React from 'react';
import { Consumer } from './context';

interface Props {
  children: (store: InnerStore) => React.ReactNode;
}

class Store extends React.PureComponent<Props, {}> {
  public renderChildren = (value: InnerStore) => {
    return this.props.children(value);
  };

  public render() {
    return <Consumer>{this.renderChildren}</Consumer>;
  }
}

export default Store;
