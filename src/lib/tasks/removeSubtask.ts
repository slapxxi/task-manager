import { Subtask, Task } from '@local/types';
import takeWhile from 'lodash-es/takeWhile';

function removeSubtask(task: Task, subtask: Subtask): Task {
  const subtasks = task.subtasks.filter((st) => st.id !== subtask.id);
  return {
    ...task,
    subtasks,
    completed:
      subtasks.length > 0
        ? takeWhile(subtasks, 'completed').length === subtasks.length
        : task.completed,
  };
}

export default removeSubtask;
