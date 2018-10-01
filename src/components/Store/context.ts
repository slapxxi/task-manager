import { createContext } from 'react';

const { Provider, Consumer } = createContext<InnerStore>({
  tasks: [],
  tags: [],
  actions: {},
} as any);

export { Provider, Consumer };
