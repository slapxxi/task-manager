import { Database, DatabaseResponse, DBTask, StoreTask } from '@local/types';
import firebase from 'firebase/app';
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
    tasks: reduce(
      response.tasks || {},
      (acc, task, id) => ({ ...acc, [id]: dbTaskToStoreTask(task) }),
      {},
    ),
    tags: response.tags || {},
    projects: response.projects || {},
  };
}

function dbTaskToStoreTask(task: DBTask): StoreTask {
  return {
    ...task,
    description: task.description || null,
    project: task.project || null,
    deadline: task.deadline || null,
  };
}

export default fetchDatabase;
