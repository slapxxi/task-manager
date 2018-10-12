import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import { createTask } from '../../lib/tasks';
import Tasks from './Tasks';
const Task: jest.Mock = require('./Task');

const tasks = [createTask({ title: 'Test Components' })];

jest.mock('@local/components/Tasks/Task', () => {
  return jest.fn((props) => (
    <button
      data-testid={props['data-testid']}
      onClick={() =>
        props.onChange(createTask({ id: 'new', title: 'New Task' }))
      }
    >
      Task
    </button>
  ));
});

beforeEach(() => {
  Task.mockClear();
});

it('displays new task when in create mode', () => {
  const { getByTestId } = render(<Tasks tasks={tasks} />);
  fireEvent.click(getByTestId('create'));
  expect(getByTestId('newTask')).not.toBeUndefined();
});

it('creates new task with correct params', () => {
  const { getByTestId } = render(<Tasks tasks={tasks} />);
  fireEvent.click(getByTestId('create'));
  expect(Task).toHaveBeenLastCalledWith(
    expect.objectContaining({
      expand: true,
      task: createTask({ id: 'unique-id-4' }),
    }),
    {},
  );
});

it('calls `onChange` when creating task', () => {
  const spy = jest.fn();
  const newTask = createTask({ id: 'new', title: 'New Task' });
  const { getByTestId } = render(<Tasks tasks={tasks} onChange={spy} />);
  fireEvent.click(getByTestId('create'));
  fireEvent.click(getByTestId('newTask'));
  expect(spy).toHaveBeenCalledWith(newTask);
});
