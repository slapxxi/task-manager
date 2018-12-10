import { DBProject, DBTag, DBTask } from '@local/types';
import firebase from 'firebase/app';

interface Response {
  tasks: { [id: string]: DBTask };
  tags: { [id: string]: DBTag };
  projects: { [id: string]: DBProject };
}

function fetchDatabase(fn: (state: Response) => void) {
  return firebase
    .database()
    .ref('/')
    .once('value', (snapshot) => {
      const response = snapshot && snapshot.val();
      if (response) {
        return fn(response);
      }
      return fn({ tasks: {}, tags: {}, projects: {} });
    });
}

export default fetchDatabase;
