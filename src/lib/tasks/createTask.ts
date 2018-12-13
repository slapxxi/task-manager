import removeNullableProperties from '@lib/removeNullableProperties';
import { Task } from '@local/types';
import uuid from 'uuid';

function createTask(params: Partial<Task>): Task {
  return removeNullableProperties({
    ...params,
    id: params.id || uuid.v4(),
    title: params.title || '',
    tags: params.tags || [],
    subtasks: params.subtasks || [],
    completed: params.completed || false,
    createdAt: params.createdAt || new Date(),
  }) as Task;
}

export default createTask;
