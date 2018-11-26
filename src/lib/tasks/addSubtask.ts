import { Subtask, Task } from '@local/types';
import includes from 'lodash-es/includes';
import takeWhile from 'lodash-es/takeWhile';

function addSubtask(task: Task, subtask: Subtask): Task {
  const subtasks = includes(task.subtasks.map((st) => st.id), subtask.id)
    ? task.subtasks.map((st) => (st.id === subtask.id ? subtask : st))
    : [...task.subtasks, subtask];

  return {
    ...task,
    subtasks,
    completed: isTaskCompleted(subtasks),
  };
}

function isTaskCompleted(subtasks: Subtask[]): boolean {
  return takeWhile(subtasks, 'completed').length === subtasks.length;
}

export default addSubtask;
