import { Database } from '@local/types';
import firebase from 'firebase/app';

function saveDatabase(data: Database) {
  return firebase
    .database()
    .ref('/')
    .set(data);
}

export default saveDatabase;
