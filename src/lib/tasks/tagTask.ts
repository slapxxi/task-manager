import { Task } from '@local/types';

function tagTask(task: Task, tag: Tag) {
  if (tag.name === undefined) {
    throw new Error('Tag cannot be empty');
  }
  return { ...task, tags: [...task.tags, tag] };
}

export default tagTask;
