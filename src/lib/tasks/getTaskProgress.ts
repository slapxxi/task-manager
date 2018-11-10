import { Percentage, Task } from '@local/types';

function getTaskProgress(task: Task): Percentage {
  return task.subtasks.filter((st) => st.completed).length / task.subtasks.length;
}

export default getTaskProgress;
