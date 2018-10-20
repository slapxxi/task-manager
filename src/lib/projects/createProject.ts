import { Project } from '@local/types';
import uuid from 'uuid';

interface Params extends Partial<Project> {}

function createProject(params: Params): Project {
  if (params.name === undefined || params.name === '') {
    throw new Error('Name of a project cannot be empty.');
  }
  return {
    id: params.id || uuid.v4(),
    name: params.name,
    tasks: params.tasks || [],
  };
}

export default createProject;
