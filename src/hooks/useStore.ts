import { createTask, fromEpochTime } from '@lib';
import StoreContext from '@local/components/Store/context';
import { ActionType } from '@local/components/Store/StoreProvider';
import {
  Project,
  StoreEntry,
  StoreProject,
  StoreTag,
  StoreTask,
  Tag,
  Task,
} from '@local/types';
import compact from 'lodash-es/compact';
import map from 'lodash-es/map';
import sortBy from 'lodash-es/sortBy';
import { useContext } from 'react';

function useStore() {
  const { dispatch, ...state } = useContext(StoreContext);

  const actions = {
    updateTask(task: Task) {
      dispatch({ type: ActionType.updateTask, payload: task });
    },
    deleteTask(task: Task) {
      dispatch({ type: ActionType.deleteTask, payload: task });
    },
    updateProject(project: Project) {
      dispatch({ type: ActionType.updateProject, payload: project });
    },
    deleteProject(project: Project) {
      dispatch({ type: ActionType.deleteProject, payload: project });
    },
  };

  const selectors = {
    getTags() {
      return normalizeTags(state.tags);
    },
    getTasks() {
      return normalizeTasks(state.tasks, normalizeTags(state.tags));
    },
    getProjects() {
      return normalizeProjects(
        state.projects,
        normalizeTasks(state.tasks, normalizeTags(state.tags)),
      );
    },
  };

  return { ...selectors, actions, state };
}

function normalizeTasks(tasks: StoreEntry<StoreTask>, tags: Tag[]): Task[] {
  return sortBy(
    map(tasks, (task, key) =>
      createTask({
        ...task,
        id: key,
        tags: matchTags(task, tags),
        createdAt: fromEpochTime(task.createdAt),
        deadline: task.deadline && fromEpochTime(task.deadline),
      }),
    ),
    'createdAt',
  );
}

function matchTags(task: StoreTask, tags: Tag[]): Tag[] {
  if (task.tags) {
    return compact(task.tags.map((id) => tags.filter((it) => it.id === id)[0]));
  }
  return [];
}

function normalizeTags(tags: StoreEntry<StoreTag>): Tag[] {
  return map(tags, (item, key) => ({
    id: key,
    name: item.name || 'empty tag',
  }));
}

function normalizeProjects(projects: StoreEntry<StoreProject>, tasks: Task[]): Project[] {
  return map(projects, (item, key) => ({
    id: key,
    name: item.name,
    tasks: tasks.filter((t) => t.project && t.project === key),
  }));
}

export default useStore;
