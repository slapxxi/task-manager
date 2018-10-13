import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import { createTask } from '../../lib/tasks';
import Task from './Task';

const task = createTask({ id: 'test', title: 'test' });

it('calls `onExpand` when expand button clicked', () => {
  const spy = jest.fn();
  const { getByTestId } = render(<Task task={task} onExpand={spy} />);
  fireEvent.click(getByTestId('expand'));
  expect(spy).toHaveBeenCalled();
});

it('expands when title clicked', () => {
  const spy = jest.fn();
  const { getByTestId } = render(<Task task={task} onExpand={spy} />);
  fireEvent.click(getByTestId('title'));
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith(true);
});

it('calls `onExpand` with `true` when not expanded', () => {
  const spy = jest.fn();
  const { getByTestId } = render(
    <Task task={task} onExpand={spy} expand={false} />,
  );
  fireEvent.click(getByTestId('expand'));
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith(true);
});

it('calls `onExpand` with `false` when expanded', () => {
  const spy = jest.fn();
  const { getByTestId } = render(
    <Task task={task} onExpand={spy} expand={true} />,
  );
  fireEvent.click(getByTestId('expand'));
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith(false);
});

it('calls `onChange` when checkbox clicked', () => {
  const spy = jest.fn();
  const { getByTestId } = render(<Task task={task} onEdit={spy} />);
  fireEvent.click(getByTestId('checkbox'));
  expect(spy).toHaveBeenCalledWith({ ...task, completed: true });
});

it('calls `onChange` when title changes', () => {
  const spy = jest.fn();
  const { getByTestId } = render(<Task task={task} onEdit={spy} />);
  fireEvent.change(getByTestId('title'), { target: { value: 'new' } });
  expect(spy).toHaveBeenCalledWith({ ...task, title: 'new' });
});

it('calls `onChange` when description changes', () => {
  const spy = jest.fn();
  const { getByTestId } = render(<Task task={task} onEdit={spy} />);
  fireEvent.change(getByTestId('description'), { target: { value: 'new' } });
  expect(spy).toHaveBeenCalledWith({ ...task, description: 'new' });
});

it('requires confirmation when deleting on `confirmDelete`', () => {
  window.confirm = jest.fn(() => true);
  const spy = jest.fn();
  const { getByTestId } = render(
    <Task task={task} onDelete={spy} confirmDelete={true} />,
  );
  fireEvent.click(getByTestId('delete'));
  expect(window.confirm).toHaveBeenCalledWith(
    'Sure you want to delete this task?',
  );
  expect(spy).toHaveBeenCalledWith(task);
});

it('calls `onDelete` when delete clicked', () => {
  const spy = jest.fn();
  const { getByTestId } = render(<Task task={task} onDelete={spy} />);
  fireEvent.click(getByTestId('delete'));
  expect(spy).toHaveBeenCalledWith(task);
});

it('does not call `onDelete` without confirmation', () => {
  window.confirm = jest.fn(() => false);
  const spy = jest.fn();
  const { getByTestId } = render(
    <Task task={task} onDelete={spy} confirmDelete={true} />,
  );
  fireEvent.click(getByTestId('delete'));
  expect(spy).not.toHaveBeenCalled();
});
