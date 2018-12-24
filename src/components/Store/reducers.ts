import removeNullableProperties from '@lib/removeNullableProperties';
import toEpochTime from '@lib/toEpochTime';
import { DBProject, DBTask, ID, Nullable, Project, Tag, Task } from '@local/types';
import find from 'lodash-es/find';
import flatten from 'lodash-es/flatten';
import includes from 'lodash-es/includes';
import map from 'lodash-es/map';
import reduce from 'lodash-es/reduce';
import uniq from 'lodash-es/uniq';
import { ActionType, StoreAction } from './actions';
import { State } from './StoreProvider';

function storeReducer(state: State, action: StoreAction): State {
  switch (action.type) {
    case ActionType.startSync:
      return { ...state, isSyncing: true };
    case ActionType.completeSync:
      return { ...state, isSyncing: false };
    case ActionType.requestData:
      return { ...state, isLoading: true, isSyncing: false };
    case ActionType.receiveData:
      return {
        ...action.payload,
        isLoading: false,
        lastUpdated: state.lastUpdated,
        isSyncing: false,
      };
    case ActionType.updateTask:
      return updateState(updateTask(state, action.payload));
    case ActionType.deleteTask:
      return updateState(deleteTask(state, action.payload));
    case ActionType.updateProject:
      return updateState(updateProject(state, action.payload));
    case ActionType.deleteProject:
      return updateState(deleteProject(state, action.payload));
    default:
      return state;
  }
}

function updateState(state: State): State {
  return { ...state, lastUpdated: Date.now() };
}

function updateTask(state: State, task: Task): State {
  const { tags: updatedTags = {} } = task.tags.reduce(
    (updatedState, tag) => updateTag(updatedState, tag),
    state,
  );
  const newState = {
    ...state,
    tags: updatedTags,
    tasks: {
      ...state.tasks,
      [task.id]: normalizeTask({
        ...task,
        tags: task.tags.map((t) => findMatchingTag(state, t) || t),
      }),
    },
  };
  return deleteUnusedTags(newState);
}

function updateTag(state: State, tag: Tag): State {
  tag = findMatchingTag(state, tag) || tag;
  return {
    ...state,
    tags: { ...state.tags, [tag.id]: { name: tag.name } },
  };
}

function findMatchingTag(state: State, tag: Tag): Nullable<Tag> {
  return find(
    map(state.tags, (t, id) => ({ id, name: t.name })),
    (t) =>
      t.name.toLowerCase().trim() === tag.name.toLowerCase().trim() || t.id === tag.id,
  );
}

function normalizeTask(task: Task): DBTask {
  const dbTask = {
    ...task,
    tags: (task.tags as Tag[]).map((t) => t.id),
    deadline: task.deadline && toEpochTime(task.deadline),
    createdAt: toEpochTime(task.createdAt),
  };
  delete dbTask.id;
  return removeNullableProperties(dbTask) as DBTask;
}

function updateProject(state: State, project: Project): State {
  return {
    ...state,
    projects: { ...state.projects, [project.id]: normalizeProject(project) },
  };
}

function normalizeProject(project: Project): DBProject {
  return { name: project.name };
}

function deleteTask(state: State, task: Task): State {
  const updatedState = { ...state };
  delete updatedState.tasks[task.id];
  return deleteUnusedTags(updatedState);
}

function deleteUnusedTags(state: State): State {
  const updatedTags = reduce(
    state.tags,
    (acc, tag, tagId) => {
      if (isUsedAnywhere(state, tagId)) {
        return { ...acc, [tagId]: tag };
      }
      return acc;
    },
    {},
  );
  return { ...state, tags: updatedTags };
}

function isUsedAnywhere(state: State, tagId: ID): boolean {
  const tagsUsedElsewhere = getTagsUsedInTasks(state);
  if (includes(tagsUsedElsewhere, tagId)) {
    return true;
  }
  return false;
}

function getTagsUsedInTasks(state: State): ID[] {
  return uniq(flatten(map(state.tasks, (task) => task.tags)));
}

function deleteProject(state: State, project: Project): State {
  const updatedState = { ...state, tasks: state.tasks };
  delete updatedState.projects[project.id];
  return removeProjectFromTasks(updatedState, project);
}

function removeProjectFromTasks(state: State, project: Project): State {
  const updatedTasks = reduce(
    state.tasks,
    (acc, task, taskId) => {
      if (task.project === project.id) {
        return { ...acc, [taskId]: { ...task, project: '' } };
      }
      return { ...acc, [taskId]: task };
    },
    {},
  );
  return { ...state, tasks: updatedTasks };
}

export default storeReducer;
