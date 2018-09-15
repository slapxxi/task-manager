import { createContext } from 'react';

const { Provider, Consumer } = createContext<StoreState>({ tasks: [] });

export { Provider, Consumer };
