import { Task } from '@local/types';

function toggleTask(task: Task) {
  return { ...task, completed: !task.completed };
}

export default toggleTask;
