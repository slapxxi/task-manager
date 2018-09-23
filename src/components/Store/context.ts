import { createContext } from 'react';

const { Provider, Consumer } = createContext<InnerStore>({
  tasks: [],
  tags: [],
});

export { Provider, Consumer };
