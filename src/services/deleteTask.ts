import { Task } from '@local/types';
import firebase from 'firebase/app';

function deleteTask(task: Task) {
  firebase
    .database()
    .ref(`/tasks/${task.id}`)
    .remove();
}

export default deleteTask;
