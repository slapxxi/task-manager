import { InnerStore } from '@local/types';
import { createContext } from 'react';

const Context = createContext<InnerStore>({
  tasks: [],
  tags: [],
  actions: {},
} as any);

const { Provider, Consumer } = Context;

export { Provider, Consumer };

export default Context;
