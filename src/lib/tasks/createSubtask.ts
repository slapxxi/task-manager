import { Subtask } from '@local/types';
import uuid from 'uuid';

function createSubtask({
  id = uuid.v4(),
  description = '',
  completed = false,
}: Partial<Subtask>): Subtask {
  return {
    id,
    description,
    completed,
  };
}

export default createSubtask;
