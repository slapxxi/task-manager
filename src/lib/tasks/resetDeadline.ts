import { Task } from '@local/types';

function resetDeadline(task: Task): Task {
  const result = { ...task, deadline: undefined };
  delete result.deadline;
  return result;
}

export default resetDeadline;
