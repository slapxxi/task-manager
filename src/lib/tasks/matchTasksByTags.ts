import { Tag, Task } from '@local/types';
import intersection from 'lodash-es/intersection';

function matchTasksByTags(tasks: Task[], tags: Tag[]): Task[] {
  if (tags.length === 0) {
    return tasks;
  }
  return tasks.reduce(
    (acc, task) => (containsTags(task, tags) ? [...acc, task] : acc),
    [] as Task[],
  );
}

function containsTags(task: Task, tags: Tag[]) {
  const result = intersection(
    (task.tags as Tag[]).map((t) => t.id),
    tags.map((t) => t.id),
  );
  return result.length > 0;
}

export default matchTasksByTags;
