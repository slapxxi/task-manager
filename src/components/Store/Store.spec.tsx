import React from 'react';
import { render } from 'react-testing-library';
import uuid from 'uuid';
import { createTag } from '../../lib/tags';
import { createTask } from '../../lib/tasks';
import { pollDatabase } from '../../services';
import Store from './Store';
import StoreProvider from './StoreProvider';

Date.now = () => 100;

const initialState = {
  tasks: [createTask()],
  tags: [createTag()],
};

const remoteState = {
  tasks: [createTask()],
  tags: [createTag()],
};

const capture = jest.fn(() => 'div');

jest.mock('../../services/', () => ({
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
