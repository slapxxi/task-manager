import uuid from 'uuid';

interface Params {
  id?: Task['id'];
  title?: Task['title'];
  description?: Task['description'];
  completed?: Task['completed'];
  createdAt?: Task['createdAt'];
}

function createTask(params?: Params): Task {
  const id = uuid.v4();
  if (params) {
    return {
      id: params.id || id,
      title: params.title || null,
      description: params.description || null,
      completed: params.completed || false,
      createdAt: params.createdAt || Date.now(),
    };
  }
  return {
    id,
    title: '',
    completed: false,
    description: '',
    createdAt: Date.now(),
  };
}

export default createTask;
