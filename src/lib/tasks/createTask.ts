import { Task } from '@local/types';
import uuid from 'uuid';

interface Params extends Partial<Task> {}

function createTask(params?: Params): Task {
  const id = uuid.v4();
  if (params) {
    return {
      id: params.id || id,
      title: params.title || '',
      tags: params.tags || [],
      description: params.description || '',
      project: params.project || '',
      subtasks: params.subtasks || [],
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
    project: '',
    subtasks: [],
    createdAt: Date.now(),
  };
}

export default createTask;
