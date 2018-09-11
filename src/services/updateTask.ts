import firebase from 'firebase';

function updateTask(task: Task) {
  firebase
    .database()
    .ref(`/tasks/${task.id}`)
    .set(task);
}

export default updateTask;
