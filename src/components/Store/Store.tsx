import * as React from 'react';
import { Consumer } from './context';

interface Props {
  children: (store: any) => React.ReactNode;
}

class Store extends React.Component<Props, {}> {
  public render() {
    return <Consumer>{(store) => this.props.children(store)}</Consumer>;
  }
}

export default Store;
