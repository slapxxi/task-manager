import { Task } from '@local/types';
import uuid from 'uuid';

interface Params {
  id?: Task['id'];
  title?: Task['title'];
  tags?: Tag[];
  project?: ID;
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
      project: params.project || null,
      completed: params.completed || false,
      createdAt: params.createdAt || Date.now(),
    };
  }
  return {
    id,
    title: null,
    completed: false,
    tags: [],
    description: null,
    project: null,
    createdAt: Date.now(),
  };
}

export default createTask;
