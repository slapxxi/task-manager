import { createTask, fromEpochTime } from '@lib';
import {
  DBEntry,
  DBProject,
  DBTag,
  DBTask,
  Project,
  StoreState,
  Tag,
  Task,
} from '@local/types';
import firebase from 'firebase';
import { compact, map, sortBy } from 'lodash';

function pollDatabase(fn: (state: StoreState) => void) {
  return firebase
    .database()
    .ref('/')
    .on('value', (snapshot) => {
      if (snapshot) {
        const response = snapshot.val();
        const tags = normalizeTags(response.tags);
        const tasks = normalizeTasks(response.tasks, tags);
        const projects = normalizeProjects(response.projects, tasks);
        return fn({ tasks, tags, projects });
      }
      return fn({ tasks: [], tags: [], projects: [] });
    });
}

function normalizeTasks(tasks: DBEntry<DBTask>, tags: Tag[]): Task[] {
  return sortBy(
    map(tasks, (task, key) =>
      createTask({
        ...task,
        id: key,
        tags: matchTags(task, tags),
        deadline: task.deadline === 0 ? undefined : fromEpochTime(task.deadline),
      }),
    ),
    'createdAt',
  );
}

function matchTags(task: DBTask, tags: Tag[]): Tag[] {
  if (task.tags) {
    return compact(task.tags.map((id) => tags.filter((it) => it.id === id)[0]));
  }
  return [];
}

function normalizeTags(tags: DBEntry<DBTag>): Tag[] {
  return map(tags, (item, key) => ({
    id: key,
    name: item.name || 'empty tag',
  }));
}

function normalizeProjects(projects: DBEntry<DBProject>, tasks: Task[]): Project[] {
  return map(projects, (item, key) => ({
    id: key,
    name: item.name,
    tasks: tasks.filter((t) => t.project && t.project === key),
  }));
}

export default pollDatabase;
