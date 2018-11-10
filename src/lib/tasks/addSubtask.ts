import { Subtask, Task } from '@local/types';

function addSubtask(task: Task, subtask: Subtask): Task {
  return {
    ...task,
    subtasks: task.subtasks.map((st) => (st.id === subtask.id ? subtask : st)),
  };
}

export default addSubtask;
