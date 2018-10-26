import { createTask } from '@lib';
import { Action, Task as ITask } from '@local/types';
import React, { useReducer } from 'react';
import { Button } from '../';
import { isValidTask } from '../../lib/tasks';
import Task from './Task';
import Tasks from './Tasks';

enum Mode {
  default,
  create,
}

enum Actions {
  create,
  finish,
  expand,
  hide,
  cancel,
}

interface Props {
  tasks: ITask[];
  onCreate?: (task: ITask) => void;
  onEdit?: (task: ITask) => void;
  onDelete?: (task: ITask) => void;
}

interface State {
  mode: Mode;
  activeIndex: number;
  lastActiveIndex: number;
}

function TasksEditor({ tasks, onEdit, onDelete, onCreate }: Props) {
  const [state, dispatch] = useReducer(tasksReducer, {
    mode: Mode.default,
    activeIndex: NaN,
    lastActiveIndex: NaN,
  });

  function handleCreateTask(task: ITask) {
    if (isValidTask(task)) {
      dispatch({ type: Actions.finish, payload: tasks.length });
      if (onCreate) {
        onCreate(task);
      }
    }
  }

  function handleEdit(task: ITask) {
    if (onEdit) {
      onEdit(task);
    }
  }

  function handleDelete(task: ITask) {
    if (onDelete) {
      onDelete(task);
    }
  }

  function handleEnableCreate() {
    dispatch({ type: Actions.create });
  }

  function handleCancel() {
    dispatch({ type: Actions.cancel });
  }

  function handleExpand(index: number, expand: boolean) {
    if (expand === false) {
      dispatch({ type: Actions.hide });
      return;
    }
    dispatch({ type: Actions.expand, payload: index });
  }

  return (
    <>
      <Tasks tasks={state.mode === Mode.create ? [...tasks, createTask({})] : tasks}>
        {({ task, index }) =>
          state.mode === Mode.create && index === tasks.length ? (
            <Task task={task} expand={true} onEdit={handleCreateTask} />
          ) : (
            <Task
              task={task}
              expand={index === state.activeIndex}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onExpand={(expand) => handleExpand(index, expand)}
              confirmDelete
            />
          )
        }
      </Tasks>
      {state.mode === Mode.default ? (
        <Button onClick={handleEnableCreate}>Create Task</Button>
      ) : (
        <Button onClick={handleCancel}>Cancel</Button>
      )}
    </>
  );
}

function tasksReducer(state: State, action: Action<Actions>) {
  switch (action.type) {
    case Actions.create:
      return {
        ...state,
        mode: Mode.create,
        lastActiveIndex: state.activeIndex,
        activeIndex: NaN,
      };
    case Actions.finish:
      return { ...state, mode: Mode.default, activeIndex: action.payload };
    case Actions.expand:
      return { ...state, mode: Mode.default, activeIndex: action.payload };
    case Actions.hide:
      return { ...state, activeIndex: NaN };
    case Actions.cancel:
      return {
        ...state,
        mode: Mode.default,
        activeIndex: state.lastActiveIndex,
        lastActiveIndex: NaN,
      };
    default:
      return state;
  }
}

export default React.memo(TasksEditor);
