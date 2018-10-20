import { Project, Task } from '@local/types';

function assignToProject(task: Task, project: Project) {
  if (project.id === undefined) {
    throw new Error('Missing project ID');
  }
  return { ...task, project: project.id };
}

export default assignToProject;
