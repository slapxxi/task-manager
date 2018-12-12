import { createTask, fromEpochTime } from '@lib';
import { DBEntry, DBProject, DBTask, Project, StoreTag, Tag, Task } from '@local/types';
import firebase from 'firebase/app';
import compact from 'lodash-es/compact';
import map from 'lodash-es/map';
import sortBy from 'lodash-es/sortBy';

interface Response {
  tags: Tag[];
  tasks: Task[];
  projects: Project[];
}

function pollDatabase(fn: (state: Response) => void) {
  return firebase
    .database()
    .ref('/')
    .on('value', (snapshot) => {
      const response = snapshot && snapshot.val();
      if (response) {
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

function normalizeTags(tags: DBEntry<StoreTag>): Tag[] {
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
