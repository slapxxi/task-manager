import { Project } from '@local/types';
import firebase from 'firebase';

function updateProject(project: Project) {
  firebase
    .database()
    .ref(`/projects/${project.id}`)
    .set({ name: project.name });
}

export default updateProject;
