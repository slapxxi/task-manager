import uuid from 'uuid';

interface Params {
  id?: Task['id'];
  title?: Task['title'];
  tags?: Tag[];
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
      tags: params.tags || [],
      description: params.description || null,
      completed: params.completed || false,
      createdAt: params.createdAt || Date.now(),
    };
  }
  return {
    id,
    title: '',
    completed: false,
    tags: [],
    description: '',
    createdAt: Date.now(),
  };
}

export default createTask;
