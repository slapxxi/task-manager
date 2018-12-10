import { toEpochTime } from '@lib';
import { DBEntry, DBProject, DBTag, DBTask, ID, Project, Tag, Task } from '@local/types';
import { cloneDeep } from 'lodash-es';
import find from 'lodash-es/find';
import flatten from 'lodash-es/flatten';
import includes from 'lodash-es/includes';
import map from 'lodash-es/map';
import reduce from 'lodash-es/reduce';
import uniq from 'lodash-es/uniq';
import React, { useReducer } from 'react';
import { Provider } from './context';

enum ActionType {
  receiveData = 'RECEIVE_DATA',
  requestData = 'REQUEST_DATA',
  updateTask = 'UPDATE_TASK',
  deleteTask = 'DELETE_TASK',
  updateProject = 'UPDATE_PROJECT',
  deleteProject = 'DELETE_PROJECT',
}

type StoreAction =
  | { type: ActionType.requestData }
  | { type: ActionType.receiveData; payload: State }
  | { type: ActionType.updateTask; payload: Task }
  | { type: ActionType.deleteTask; payload: Task }
  | { type: ActionType.updateProject; payload: Project }
  | { type: ActionType.deleteProject; payload: Project };

interface State {
  readonly tasks: DBEntry<DBTask>;
  readonly tags: DBEntry<DBTag>;
  readonly projects: DBEntry<DBProject>;
  readonly isLoading: boolean;
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
};

function StoreProvider({ initialValue = defaultState, children }: Props) {
  const [state, dispatch] = useReducer<State, StoreAction>(
    storeReducer,
    cloneDeep(initialValue),
  );

  // useEffect(() => {
  //   dispatch({ type: Actions.requestData });
  //   fetchDatabase((db) => dispatch({ type: Actions.receiveData, payload: db }));
  // }, []);

  return <Provider value={{ ...state, dispatch }}>{children}</Provider>;
}

function storeReducer(state: State, action: StoreAction): State {
  switch (action.type) {
    case ActionType.requestData:
      return { ...state, isLoading: true };
    case ActionType.receiveData:
      return { ...action.payload, isLoading: false };
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
  const { tags: updatedTags } = task.tags.reduce(
    (updatedState, tag) => updateTag(updatedState, tag),
    state,
  );
  return {
    ...state,
    tags: updatedTags,
    tasks: {
      ...state.tasks,
      [task.id]: normalizeTask({
        ...task,
        tags: task.tags.map((t) => findMatchingTag(state, t)),
      }),
    },
  };
}

function updateTag(state: State, tag: Tag): State {
  const updatedTag = findMatchingTag(state, tag);
  return {
    ...state,
    tags: { ...state.tags, [updatedTag.id]: { name: updatedTag.name } },
  };
}

function findMatchingTag(state: State, tag: Tag): Tag {
  const matchingTag = find(
    map(state.tags, (t, id) => ({ id, name: t.name })),
    (t) =>
      t.name.toLowerCase().trim() === tag.name.toLowerCase().trim() || t.id === tag.id,
  );
  if (matchingTag) {
    return matchingTag;
  } else {
    return tag;
  }
}

function normalizeTask(task: Task): DBTask {
  const result = {
    ...task,
    tags: (task.tags as Tag[]).map((t) => t.id),
    deadline: task.deadline ? toEpochTime(task.deadline) : undefined,
    createdAt: toEpochTime(task.createdAt),
  };
  delete result.id;
  return result;
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
  return deleteExtranousTags(updatedState);
}

function deleteExtranousTags(state: State): State {
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
  return removeProjectFromTasks(state, project);
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
