import { Task } from '@local/types';
import { isToday } from 'date-fns';

function selectTodayTasks(tasks: Task[]) {
  return tasks.filter((t) => t.deadline && isToday(t.deadline));
}

export default selectTodayTasks;
