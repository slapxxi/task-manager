import uuid from 'uuid';

interface Params {
  name: string;
}

// TODO Create nested projects
function createProject(params: Params) {
  if (params.name === '') {
    throw new Error('Name of a project cannot be empty.');
  }
  return {
    id: uuid.v4(),
    name: params.name,
  };
}

export default createProject;
