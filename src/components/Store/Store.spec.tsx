import { createProject, createTask } from '@lib';
import { useStore } from '@local/hooks';
import { size } from 'lodash-es';
import last from 'lodash-es/last';
import React, { ReactNode } from 'react';
import { fireEvent, render } from 'react-testing-library';
import StoreProvider, { State } from './StoreProvider';

jest.mock('@local/hooks/useWorker');

const mockStore = {
  tasks: {
    'test-task': {
      title: 'Test Task',
      description: 'Testing a task.',
      createdAt: 300,
      completed: false,
      project: 'test-project',
      subtasks: [],
      tags: ['css', 'html'],
      deadline: 200,
    },
    'second-task': {
      title: 'Second Task',
      description: 'Testing a task.',
      createdAt: 500,
      completed: false,
      project: 'second-project',
      subtasks: [],
      tags: ['html'],
      deadline: 300,
    },
  },
  tags: {
    css: {
      name: 'CSS',
    },
    html: {
      name: 'HTML',
    },
  },
  projects: {
    'test-project': {
      name: 'Test Project',
    },
    'second-project': {
      name: 'Second Test Project',
    },
  },
  isLoading: false,
  isSyncing: false,
  lastUpdated: 0,
};

function Subject({ children }: { children: (store: any) => ReactNode }) {
  const store = useStore();
  return <div>{children(store)}</div>;
}

it('provides tasks selector', () => {
  const spy = jest.fn(() => 'div');

  render(
    <StoreProvider initialValue={mockStore}>
      <Subject>{({ getTasks }) => spy(getTasks())}</Subject>
    </StoreProvider>,
  );

  expect(spy).toHaveBeenCalledTimes(1);
  expect(last(spy.mock.calls)).toMatchSnapshot();
});

it('provides tags selector', () => {
  const spy = jest.fn(() => 'div');

  render(
    <StoreProvider initialValue={mockStore}>
      <Subject>{({ getTags }) => spy(getTags())}</Subject>
    </StoreProvider>,
  );

  expect(spy).toHaveBeenCalledTimes(1);
  expect(last(spy.mock.calls)).toMatchSnapshot();
});

it('provides projects selector', () => {
  const spy = jest.fn(() => 'div');

  render(
    <StoreProvider initialValue={mockStore}>
      <Subject>{({ getProjects }) => spy(getProjects())}</Subject>
    </StoreProvider>,
  );

  expect(spy).toHaveBeenCalledTimes(1);
  expect(last(spy.mock.calls)).toMatchSnapshot();
});

it('provides raw state', () => {
  const spy = jest.fn(() => 'div');

  render(
    <StoreProvider initialValue={mockStore}>
      <Subject>{({ state }) => spy(state)}</Subject>
    </StoreProvider>,
  );

  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith(mockStore);
});

it('provides action to create tasks', () => {
  Date.now = () => 100;
  const spy = jest.fn(() => 'div');
  const Tree = (
    <StoreProvider initialValue={mockStore}>
      <Subject>
        {({ actions, state }) =>
          spy(state) && (
            <button
              onClick={() =>
                actions.updateTask(
                  createTask({
                    id: 'new-task',
                    title: 'new',
                    tags: [{ id: 'new', name: 'ruby' }, { id: 'old', name: 'css' }],
                  }),
                )
              }
              data-testid="trigger"
            />
          )
        }
      </Subject>
    </StoreProvider>
  );
  const { getByTestId, rerender } = render(Tree);

  fireEvent.click(getByTestId('trigger'));

  const latestState = getLatestState(spy);
  const newTask = latestState.tasks['new-task'];
  expect(spy).toHaveBeenCalledTimes(2);
  expect(newTask).not.toBeUndefined();
  expect(newTask.tags).toEqual(['new', 'css']);
  expect(newTask.completed).toEqual(false);
  expect(latestState.tags).toEqual({
    css: { name: 'CSS' },
    html: { name: 'HTML' },
    new: { name: 'ruby' },
  });

  rerender(Tree);
});

it('provides action to update tasks', () => {
  const spy = jest.fn(() => 'div');

  const { getByTestId } = render(
    <StoreProvider initialValue={mockStore}>
      <Subject>
        {({ actions, getTasks, state }) =>
          spy(state) && (
            <button
              onClick={() =>
                actions.updateTask({ ...getTasks()[0], title: 'Changed Task', tags: [] })
              }
              data-testid="trigger"
            />
          )
        }
      </Subject>
    </StoreProvider>,
  );

  fireEvent.click(getByTestId('trigger'));

  const latestState = getLatestState(spy);
  expect(spy).toHaveBeenCalledTimes(2);
  expect(latestState.tasks['test-task'].title).toEqual('Changed Task');
  expect(latestState.tasks['test-task'].tags).toEqual([]);
  expect(latestState.tags).toEqual({ html: { name: 'HTML' } });
});

it('provides action to delete tasks', () => {
  const spy = jest.fn(() => 'div');

  const { getByTestId } = render(
    <StoreProvider initialValue={mockStore}>
      <Subject>
        {({ actions, getTasks, state }) =>
          spy(state) && (
            <button
              onClick={() => actions.deleteTask(getTasks()[0])}
              data-testid="trigger"
            />
          )
        }
      </Subject>
    </StoreProvider>,
  );

  fireEvent.click(getByTestId('trigger'));

  const latestState = getLatestState(spy);
  expect(spy).toHaveBeenCalledTimes(2);
  expect(size(latestState.tasks)).toEqual(1);
  expect(latestState.tasks['test-task']).toBeUndefined();
  expect(latestState.tags).toEqual({ html: { name: 'HTML' } });
});

it('provides action to create projects', () => {
  const spy = jest.fn(() => 'div');

  const { getByTestId } = render(
    <StoreProvider initialValue={mockStore}>
      <Subject>
        {({ actions, state }) =>
          spy(state) && (
            <button
              onClick={() =>
                actions.updateProject(
                  createProject({ id: 'new-project', name: 'New Project' }),
                )
              }
              data-testid="trigger"
            />
          )
        }
      </Subject>
    </StoreProvider>,
  );

  fireEvent.click(getByTestId('trigger'));

  const latestState = getLatestState(spy);
  expect(spy).toHaveBeenCalledTimes(2);
  expect(size(latestState.projects)).toEqual(3);
  expect(latestState.projects['new-project']).not.toBeUndefined();
  expect(latestState.projects['new-project'].name).toEqual('New Project');
});

it('provides action to delete projects', () => {
  const spy = jest.fn(() => 'div');

  const { getByTestId } = render(
    <StoreProvider initialValue={mockStore}>
      <Subject>
        {({ actions, state, getProjects }) =>
          spy(state) && (
            <button
              onClick={() => actions.deleteProject(getProjects()[0])}
              data-testid="trigger"
            />
          )
        }
      </Subject>
    </StoreProvider>,
  );

  fireEvent.click(getByTestId('trigger'));

  const latestState = getLatestState(spy);
  expect(spy).toHaveBeenCalledTimes(2);
  expect(size(latestState.projects)).toEqual(1);
  expect(latestState.tasks['test-task'].project).toEqual('');
  expect(latestState.tasks['second-task'].project).toEqual('second-project');
});

function getLatestState(mock: jest.Mock) {
  return (last(mock.mock.calls)![0] as unknown) as State;
}
