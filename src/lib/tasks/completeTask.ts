import { Task } from '@local/types';

function completeTask(task: Task) {
  return {
    ...task,
    completed: true,
    subtasks: task.subtasks.map((st) => ({ ...st, completed: true })),
  };
}

export default completeTask;
