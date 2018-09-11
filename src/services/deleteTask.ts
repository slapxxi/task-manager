import firebase from 'firebase';

function deleteTask(task: Task) {
  firebase
    .database()
    .ref(`/tasks/${task.id}`)
    .remove();
}

export default deleteTask;
