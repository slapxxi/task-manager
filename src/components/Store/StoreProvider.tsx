import useWorker from '@local/hooks/useWorker';
import { DBEntry, DBProject, DBTag, DBTask, EpochTime } from '@local/types';
import cloneDeep from 'lodash-es/cloneDeep';
import React, { useEffect, useReducer } from 'react';
// import Worker from '../../main.worker.ts';
import { ActionType, StoreAction } from './actions';
import { Provider } from './context';
import storeReducer from './reducers';

interface State {
  readonly tasks: DBEntry<DBTask>;
  readonly tags: DBEntry<DBTag>;
  readonly projects: DBEntry<DBProject>;
  readonly isLoading: boolean;
  readonly isSyncing: boolean;
  readonly lastUpdated: EpochTime;
}

interface Props {
  initialValue?: State;
  children: React.ReactNode;
}

// const worker = new Worker();

const defaultState: State = {
  tags: {},
  tasks: {},
  projects: {},
  isLoading: true,
  isSyncing: false,
  lastUpdated: 0,
};

function StoreProvider({ initialValue = defaultState, children }: Props) {
  const [state, dispatch] = useReducer<State, StoreAction>(
    storeReducer,
    cloneDeep(initialValue),
  );
  const storeWorker = useWorker<StoreAction>((action) => {
    dispatch(action);
  });

  useEffect(() => {
    storeWorker.postMessage({ type: ActionType.requestData });
  }, []);

  useEffect(
    () => {
      if (state.lastUpdated === 0) {
        return;
      }
      storeWorker.postMessage({
        type: ActionType.syncDatabase,
        payload: { tasks: state.tasks, tags: state.tags, projects: state.projects },
      });
    },
    [state.lastUpdated],
  );

  return <Provider value={{ ...state, dispatch }}>{children}</Provider>;
}

export { State };

export default StoreProvider;
