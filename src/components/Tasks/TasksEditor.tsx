import { createTask } from '@lib';
import { Action, ID, Task as ITask } from '@local/types';
import includes from 'lodash-es/includes';
import React, { useEffect, useReducer } from 'react';
import { Button } from '../';
import { isValidTask } from '../../lib/tasks';
import styles from './styles.css';
import Task from './Task';
import Tasks from './Tasks';

enum Mode {
  default,
  create,
}

enum Actions {
  create,
  invalidate,
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
  activeId: ID;
  lastActiveId: ID;
}

function TasksEditor({ tasks, onEdit, onDelete, onCreate }: Props) {
  const [state, dispatch] = useReducer(tasksReducer, {
    mode: Mode.default,
    activeId: '',
    lastActiveId: '',
  });

  useEffect(
    () => {
      dispatch({ type: Actions.invalidate, payload: tasks.map((t) => t.id) });
    },
    [tasks.length],
  );

  function handleCreateTask(task: ITask) {
    if (isValidTask(task)) {
      dispatch({ type: Actions.finish, payload: task.id });
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

  function handleExpand(id: ID, expand: boolean) {
    if (expand === false) {
      dispatch({ type: Actions.hide });
      return;
    }
    dispatch({ type: Actions.expand, payload: id });
  }

  return (
    <>
      <Tasks tasks={state.mode === Mode.create ? [...tasks, createTask({})] : tasks}>
        {({ task, index }) =>
          state.mode === Mode.create && index === tasks.length ? (
            <Task
              task={task}
              expand={true}
              onEdit={handleCreateTask}
              className={styles.task}
            />
          ) : (
            <Task
              task={task}
              expand={task.id === state.activeId}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onExpand={(expand) => handleExpand(task.id, expand)}
              confirmDelete
              className={styles.task}
            />
          )
        }
      </Tasks>
      <footer className={styles.footer}>
        {onCreate ? (
          state.mode === Mode.default ? (
            <Button onClick={handleEnableCreate} className={styles.button}>
              Create Task
            </Button>
          ) : (
            <Button onClick={handleCancel} className={styles.button}>
              Cancel
            </Button>
          )
        ) : null}
      </footer>
    </>
  );
}

function tasksReducer(state: State, action: Action<Actions>): State {
  switch (action.type) {
    case Actions.create:
      return {
        ...state,
        mode: Mode.create,
        lastActiveId: state.activeId,
        activeId: '',
      };
    case Actions.invalidate:
      return includes(action.payload, state.activeId)
        ? state
        : { ...state, activeId: '' };
    case Actions.finish:
      return { ...state, mode: Mode.default, activeId: action.payload };
    case Actions.expand:
      return { ...state, mode: Mode.default, activeId: action.payload };
    case Actions.hide:
      return { ...state, activeId: '' };
    case Actions.cancel:
      return {
        ...state,
        mode: Mode.default,
        activeId: state.lastActiveId,
        lastActiveId: '',
      };
    default:
      return state;
  }
}

export default React.memo(TasksEditor);
