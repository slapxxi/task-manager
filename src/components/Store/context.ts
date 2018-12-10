import { State, StoreAction } from '@local/components/Store/StoreProvider';
import { createContext } from 'react';

interface ContextValue extends State {
  dispatch: (action: StoreAction) => void;
}

const Context = createContext<ContextValue>({
  tasks: {},
  projects: {},
  tags: {},
  isLoading: false,
  dispatch: () => null,
});

const { Provider, Consumer } = Context;

export { Provider, Consumer };

export default Context;
