import { Task } from '@local/types';

function setDeadline(task: Task, date: Date) {
  return { ...task, deadline: date };
}

export default setDeadline;
