import { Task } from '@local/types';

function resetTaskCompletion(task: Task) {
  return {
    ...task,
    completed: false,
    subtasks: task.subtasks.map((st) => ({ ...st, completed: false })),
  };
}

export default resetTaskCompletion;
