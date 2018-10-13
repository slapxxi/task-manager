import { Task } from '@local/types';
import uuid from 'uuid';

interface Params {
  name: string;
  tasks?: Task[];
}

// TODO Create nested projects
function createProject(params: Params): Project {
  if (params.name === '') {
    throw new Error('Name of a project cannot be empty.');
  }
  return {
    id: uuid.v4(),
    name: params.name,
    tasks: params.tasks || [],
  };
}

export default createProject;
