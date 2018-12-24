import { useEffect } from 'react';
import Worker from '../main.worker.ts';

const worker = new Worker();

function useWorker<Action>(onMessage: (action: Action) => void) {
  useEffect(() => {
    worker.addEventListener('message', ({ data }) => onMessage(data));
    return () => worker.removeEventListener('message', ({ data }) => onMessage(data));
  }, []);

  return worker;
}

export default useWorker;
