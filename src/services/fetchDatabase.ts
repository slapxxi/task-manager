import { Database, DatabaseResponse } from '@local/types';
import firebase from 'firebase/app';
import 'firebase/database';
import reduce from 'lodash-es/reduce';

function fetchDatabase(fn: (state: Database) => void) {
  return firebase
    .database()
    .ref('/')
    .once('value', (snapshot) => {
      const response = snapshot && snapshot.val();
      if (response) {
        return fn(normalizeResponse(response));
      }
      return fn({ tasks: {}, tags: {}, projects: {} });
    });
}

function normalizeResponse(response: DatabaseResponse): Database {
  return {
    tasks: reduce(response.tasks || {}, (acc, task, id) => ({ ...acc, [id]: task }), {}),
    tags: response.tags || {},
    projects: response.projects || {},
  };
}

export default fetchDatabase;
