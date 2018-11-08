import { Percentage, Project } from '@local/types';

function getProjectProgress(project: Project): Percentage {
  if (project.tasks.length === 0) {
    return 0;
  }
  return project.tasks.filter((t) => t.completed).length / project.tasks.length;
}

export default getProjectProgress;
