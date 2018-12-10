import { Task } from '@local/types';
import uuid from 'uuid';

function createTask(params: Partial<Task>): Task {
  return {
    id: params.id || uuid.v4(),
    title: params.title || '',
    tags: params.tags || [],
    description: params.description || '',
    project: params.project || '',
    subtasks: params.subtasks || [],
    completed: params.completed || false,
    createdAt: params.createdAt || new Date(),
    deadline: params.deadline,
  };
}

export default createTask;
