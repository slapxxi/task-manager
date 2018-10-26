import { Action } from '@local/types';
import { useEffect, useReducer, useRef } from 'react';

interface State {
  isRunning: boolean;
  lapse: number;
}

enum Actions {
  start,
  pause,
  stop,
  tick,
}

function useStopwatch(): [State, () => void, () => void] {
  const [state, dispatch] = useReducer(stopwatchReducer, { isRunning: false, lapse: 0 });
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(
    () => {
      if (state.isRunning) {
        const startTime = Date.now() - state.lapse;
        intervalRef.current = setInterval(() => {
          dispatch({ type: Actions.tick, payload: Date.now() - startTime });
        }, 0);
      }
      return () => clearInterval(intervalRef.current);
    },
    [state.isRunning],
  );

  function handleRunClick() {
    if (state.isRunning) {
      dispatch({ type: Actions.pause });
    } else {
      dispatch({ type: Actions.start });
    }
  }

  function handleClear() {
    dispatch({ type: Actions.stop });
  }

  return [{ ...state }, handleRunClick, handleClear];
}

function stopwatchReducer(state: State, action: Action<Actions>) {
  switch (action.type) {
    case Actions.start:
      return { ...state, isRunning: true };
    case Actions.pause:
      return { ...state, isRunning: false };
    case Actions.tick:
      return { ...state, lapse: state.isRunning ? action.payload : state.lapse };
    case Actions.stop:
      return { lapse: 0, isRunning: false };
    default:
      return state;
  }
}

export default useStopwatch;
