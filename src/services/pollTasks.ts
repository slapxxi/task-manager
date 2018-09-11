import firebase from 'firebase';
import mapResponseToData from './mapResponseToData';

function pollTasks(fn: (tasks: Task[]) => void) {
  return firebase
    .database()
    .ref('/tasks')
    .on('value', (snapshot) => {
      if (snapshot) {
        return fn(mapResponseToData(snapshot.val()));
      }
      return fn([]);
    });
}

export default pollTasks;
