import { toEpochTime } from '@lib';
import removeNullableProperties from '@lib/removeNullableProperties';
import fetchDatabase from '@local/services/fetchDatabase';
import saveDatabase from '@local/services/saveDatabase';
import {
  Database,
  DBEntry,
  DBProject,
  DBTag,
  DBTask,
  EpochTime,
  ID,
  Nullable,
  Project,
  Tag,
  Task,
} from '@local/types';
import cloneDeep from 'lodash-es/cloneDeep';
import debounce from 'lodash-es/debounce';
import find from 'lodash-es/find';
import flatten from 'lodash-es/flatten';
import includes from 'lodash-es/includes';
import map from 'lodash-es/map';
import reduce from 'lodash-es/reduce';
import uniq from 'lodash-es/uniq';
import React, { useEffect, useReducer } from 'react';
import { Provider } from './context';

enum ActionType {
  startSync = 'START_SYNC',
  completeSync = 'COMPLETE_SYNC',
  receiveData = 'RECEIVE_DATA',
  requestData = 'REQUEST_DATA',
  updateTask = 'UPDATE_TASK',
  deleteTask = 'DELETE_TASK',
  updateProject = 'UPDATE_PROJECT',
  deleteProject = 'DELETE_PROJECT',
}

type StoreAction =
  | { type: ActionType.startSync }
  | { type: ActionType.completeSync }
  | { type: ActionType.requestData }
  | { type: ActionType.receiveData; payload: Database }
  | { type: ActionType.updateTask; payload: Task }
  | { type: ActionType.deleteTask; payload: Task }
  | { type: ActionType.updateProject; payload: Project }
  | { type: ActionType.deleteProject; payload: Project };

interface State {
  readonly tasks: DBEntry<DBTask>;
  readonly tags: DBEntry<DBTag>;
  readonly projects: DBEntry<DBProject>;
  readonly isLoading: boolean;
  readonly isSyncing: boolean;
  readonly lastUpdated: EpochTime;
}

interface Props {
  initialValue?: State;
  children: React.ReactNode;
}

const defaultState: State = {
  tags: {},
  tasks: {},
  projects: {},
  isLoading: false,
  isSyncing: false,
  lastUpdated: 0,
};

const debouncedSaveDatabase = debounce(
  (dispatch: (action: StoreAction) => void, db: Database) => {
    dispatch({ type: ActionType.startSync });
    saveDatabase(db, () => dispatch({ type: ActionType.completeSync }));
  },
  1000,
);

function StoreProvider({ initialValue = defaultState, children }: Props) {
  const [state, dispatch] = useReducer<State, StoreAction>(
    storeReducer,
    cloneDeep(initialValue),
  );

  useEffect(() => {
    dispatch({ type: ActionType.requestData });
    fetchDatabase((db) => dispatch({ type: ActionType.receiveData, payload: db }));
  }, []);

  useEffect(
    () => {
      if (state.lastUpdated === 0) {
        return;
      }
      debouncedSaveDatabase(dispatch, {
        tasks: state.tasks,
        tags: state.tags,
        projects: state.projects,
      });
    },
    [state.lastUpdated],
  );

  return <Provider value={{ ...state, dispatch }}>{children}</Provider>;
}

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
      return updateTask(state, action.payload);
    case ActionType.deleteTask:
      return deleteTask(state, action.payload);
    case ActionType.updateProject:
      return updateProject(state, action.payload);
    case ActionType.deleteProject:
      return deleteProject(state, action.payload);
    default:
      return state;
  }
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
    lastUpdated: Date.now(),
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
    lastUpdated: Date.now(),
  };
}

function normalizeProject(project: Project): DBProject {
  return { name: project.name };
}

function deleteTask(state: State, task: Task): State {
  const updatedState = { ...state, lastUpdated: Date.now() };
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
  const updatedState = { ...state, tasks: state.tasks, lastUpdated: Date.now() };
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

export { ActionType, State, StoreAction };

export default StoreProvider;
