import { Database } from '@local/types';
import firebase from 'firebase/app';

function saveDatabase(data: Database, onComplete?: () => void) {
  return firebase
    .database()
    .ref('/')
    .set(data, onComplete);
}

export default saveDatabase;
