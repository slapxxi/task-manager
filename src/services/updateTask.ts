import { Tag, Task } from '@local/types';
import firebase from 'firebase';
import { find } from 'lodash';
import uuid from 'uuid';
import createDBTag from './createDBTag';

function updateTask(task: Task, tags: Tag[]) {
  const id = task.id || uuid.v4();
  if (task.tags) {
    task = updateWithTags(task, tags);
  }
  firebase
    .database()
    .ref(`/tasks/${id}`)
    .set(createTask(task));
}

function updateWithTags(task: Task, tags: Tag[]) {
  return {
    ...task,
    tags: matchTags(task.tags as Tag[], tags),
  };
}

function matchTags(candidateTags: Tag[], existingTags: Tag[]) {
  return candidateTags.reduce<Tag[]>(
    (acc, current) => [
      ...acc,
      find(
        existingTags,
        (t) =>
          (current.name &&
            t.name.toLowerCase() === current.name.toLowerCase()) ||
          t.id === current.id,
      ) || {
        id: createDBTag({ name: current.name }),
        name: current.name,
      },
    ],
    [],
  );
}

function createTask(params: Task): APIResponse['tasks']['task'] {
  return {
    title: params.title || '',
    description: params.description || '',
    createdAt: params.createdAt || Date.now(),
    project: params.project || null,
    tags: ((params.tags || []) as Tag[]).map((t) => t.id) as string[],
    completed: params.completed || false,
  };
}

export default updateTask;
