import { Project } from '@local/types';
import firebase from 'firebase/app';

function deleteProject(project: Project) {
  const database = firebase.database();
  deleteProjectTasks(project, database);
  database.ref(`/projects/${project.id}`).remove();
}

function deleteProjectTasks(project: Project, db: firebase.database.Database) {
  project.tasks.forEach((t) => db.ref(`/tasks/${t.id}`).remove());
}

export default deleteProject;
