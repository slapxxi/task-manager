import { ActionType, StoreAction } from '@local/components/Store/actions';
import fetchDatabase from '@local/services/fetchDatabase';
import { Database } from '@local/types';
import firebase from 'firebase/app';
import debounce from 'lodash-es/debounce';
import firebaseConfig from './firebaseConfig';
import saveDatabase from './services/saveDatabase';

firebase.initializeApp(firebaseConfig);

interface StoreWorker extends Worker {
  postMessage: (action: StoreAction) => void;
}

const context: StoreWorker = self as any;

const debouncedSaveDatabase = debounce((db: Database) => {
  context.postMessage({ type: ActionType.startSync });
  saveDatabase(db, () => context.postMessage({ type: ActionType.completeSync }));
}, 1000);

context.addEventListener('message', ({ data }) => {
  switch (data.type) {
    case ActionType.requestData:
      context.postMessage({ type: ActionType.requestData });
      fetchDatabase((db) =>
        context.postMessage({ type: ActionType.receiveData, payload: db }),
      );
      return;
    case ActionType.syncDatabase:
      debouncedSaveDatabase(data.payload);
      return;
    default:
      return;
  }
});
