import { State } from '@local/components/Store/StoreProvider';
import { createContext } from 'react';
import { StoreAction } from './actions';

interface ContextValue extends State {
  dispatch: (action: StoreAction) => void;
}

const Context = createContext<ContextValue>({
  tasks: {},
  projects: {},
  tags: {},
  isLoading: false,
  isSyncing: false,
  lastUpdated: 0,
  dispatch: () => null,
});

const { Provider, Consumer } = Context;

export { Provider, Consumer };

export default Context;
