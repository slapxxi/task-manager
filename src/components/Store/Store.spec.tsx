import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import uuid from 'uuid';
import { createTag } from '../../lib/tags';
import { createTask } from '../../lib/tasks';
import { pollDatabase, updateTask } from '../../services';
import Store from './Store';
import StoreProvider from './StoreProvider';

Date.now = () => 100;

const initialState = {
  tasks: [createTask()],
  tags: [createTag()],
  projects: [],
};

const remoteState = {
  tasks: [createTask()],
  tags: [createTag({ name: 'test' })],
  projects: [],
};

const capture = jest.fn(() => 'div');

jest.mock('../../services/', () => ({
  updateTask: jest.fn((value) => value),
  pollDatabase: jest.fn((fn) => fn(remoteState)),
  stopPolling: jest.fn(),
}));

beforeEach(() => {
  capture.mockClear();
  (uuid as any).__reset();
  (pollDatabase as jest.Mock).mockClear();
});

it('passes empty store on mount', () => {
  render(
    <StoreProvider>
      <Store>{({ tasks, tags }) => capture(tasks, tags)}</Store>
    </StoreProvider>,
  );
  expect(capture).toHaveBeenCalledWith([], []);
});

it('initializes store based on passed value', () => {
  render(
    <StoreProvider store={initialState}>
      <Store>{({ tasks, tags }) => capture(tasks, tags)}</Store>
    </StoreProvider>,
  );
  expect(capture).toHaveBeenCalledWith(initialState.tasks, initialState.tags);
});

it('fetches data on initial mount', () => {
  render(
    <StoreProvider>
      <span />
    </StoreProvider>,
  );
  expect(pollDatabase).toHaveBeenCalledTimes(1);
});

it('updates state with received data', () => {
  render(
    <StoreProvider>
      <Store>{({ tasks, tags }) => capture(tasks, tags)}</Store>
    </StoreProvider>,
  );
  expect(capture).toHaveBeenLastCalledWith(remoteState.tasks, remoteState.tags);
});

it('provides actions to interact with the store', () => {
  render(
    <StoreProvider>
      <Store>{({ actions }) => capture(actions)}</Store>
    </StoreProvider>,
  );
  expect(capture).toHaveBeenLastCalledWith({
    updateTask: expect.any(Function),
    updateProject: expect.any(Function),
    deleteTask: expect.any(Function),
  });
});

it('updates tasks with `updateTask` action', () => {
  const { getByTestId } = render(
    <StoreProvider>
      <Store>
        {({ tasks, actions }) => (
          <div>
            {capture(tasks)}
            <button
              data-testid="button"
              onClick={() => actions.updateTask({ ...tasks[0], title: 'new' })}
            />
          </div>
        )}
      </Store>
    </StoreProvider>,
  );
  fireEvent.click(getByTestId('button'));
  expect(updateTask).toHaveBeenLastCalledWith(
    {
      ...remoteState.tasks[0],
      title: 'new',
    },
    remoteState.tags,
  );
});
