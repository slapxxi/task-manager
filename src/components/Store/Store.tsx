import { InnerStore } from '@local/types';
import * as React from 'react';
import { Consumer } from './context';

interface Props {
  children: (store: InnerStore) => React.ReactNode;
}

function Store({ children }: Props) {
  return <Consumer>{(store) => children(store)}</Consumer>;
}

export default Store;
