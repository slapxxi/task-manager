import { Task } from '@local/types';
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

function normalizeTasks(tasks: APIResponse['tasks'], tags: Tag[]): Task[] {
  return sortBy(
    map(tasks, (task, key) => ({
      id: key,
      title: task.title || '',
      tags: matchTags(task, tags),
      project: task.project || null,
      description: task.description || '',
      completed: task.completed || false,
      createdAt: task.createdAt || Date.now(),
    })),
    'createdAt',
  );
}

function matchTags(task: APIResponse['tasks']['task'], tags: Tag[]) {
  if (task.tags) {
    return compact(task.tags.map((id) => tags.filter((it) => it.id === id)[0]));
  }
  return [];
}

function normalizeTags(tags: APIResponse['tags']): Tag[] {
  return map(tags, (item, key) => ({
    id: key,
    name: item.name || 'empty tag',
  }));
}

function normalizeProjects(
  projects: APIResponse['projects'],
  tasks: Task[],
): Project[] {
  return map(projects, (item, key) => ({
    id: key,
    name: item.name,
    tasks: tasks.filter((t) => t.project && t.project === key),
  }));
}

export default pollDatabase;
