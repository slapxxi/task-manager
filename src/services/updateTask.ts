import { createTask, toEpochTime } from '@lib';
import { DBTask, Tag, Task } from '@local/types';
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
    .set(taskToDBTask(task));
}

function updateWithTags(task: Task, tags: Tag[]) {
  return {
    ...task,
    tags: matchTags(task.tags as Tag[], tags),
  };
}

function matchTags(candidateTags: Tag[], existingTags: Tag[]) {
  return candidateTags.reduce((acc: Tag[], candidate) => {
    const foundTag = findTag(existingTags, candidate);
    if (foundTag) {
      return [...acc, foundTag];
    }
    return [...acc, { name: candidate.name, id: createDBTag({ name: candidate.name }) }];
  }, []);
}

function findTag(parent: Tag[], child: Tag) {
  return find(
    parent,
    (c) => c.name.toLowerCase() === child.name.toLowerCase() || c.id === child.id,
  );
}

function taskToDBTask(params: Task): DBTask {
  const result = {
    ...createTask(params),
    deadline: params.deadline ? toEpochTime(params.deadline) : 0,
    tags: (params.tags as Tag[]).map((t) => t.id),
  };
  delete result.id;
  return result;
}

export default updateTask;
