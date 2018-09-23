import firebase from 'firebase';
import { compact, map, sortBy } from 'lodash';

function pollDatabase(fn: (state: StoreState) => void) {
  return firebase
    .database()
    .ref('/')
    .on('value', (snapshot) => {
      if (snapshot) {
        const tags = normalizeTags(snapshot.val().tags);
        const tasks = normalizeTasks(snapshot.val().tasks, tags);
        return fn({ tasks, tags });
      }
      return fn({ tasks: [], tags: [] });
    });
}

function normalizeTasks(tasks: APIResponse['tasks'], tags: Tag[]): Task[] {
  return sortBy(
    map(tasks, (task, key) => ({
      id: key,
      title: task.title || '',
      tags: matchTags(task, tags),
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

export default pollDatabase;
