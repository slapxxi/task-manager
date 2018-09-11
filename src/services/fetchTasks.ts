import firebase from 'firebase';
import mapResponseToData from './mapResponseToData';

async function fetchTasks() {
  const response = await firebase
    .database()
    .ref('/tasks')
    .once('value');
  const tasks = await response.val();
  return mapResponseToData(tasks);
}

export default fetchTasks;
