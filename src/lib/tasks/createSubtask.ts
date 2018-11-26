import { Subtask } from '@local/types';
import uuid from 'uuid';

function createSubtask({
  id,
  description = '',
  completed = false,
}: Partial<Subtask>): Subtask {
  return {
    id: id || uuid.v4(),
    description,
    completed,
  };
}

export default createSubtask;
