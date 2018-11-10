import { Subtask, Task } from '@local/types';

function removeSubtask(task: Task, subtask: Subtask): Task {
  return {
    ...task,
    subtasks: task.subtasks.filter((st) => st.id !== subtask.id),
  };
}

export default removeSubtask;
