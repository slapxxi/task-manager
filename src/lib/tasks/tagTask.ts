import { Task, UserCreatedTag } from '@local/types';

function tagTask(task: Task, tag: Tag | UserCreatedTag): Task {
  if (tag.name === undefined) {
    throw new Error('Tag cannot be empty');
  }
  return { ...task, tags: [...task.tags, tag] };
}

export default tagTask;
