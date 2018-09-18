import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import TaskItem from './TaskItem';

const task = {
  id: 'test',
  title: 'test',
};

const updater = jest.fn();
const confirm = jest.fn(() => true);
const decline = jest.fn(() => false);

beforeEach(() => {
  updater.mockClear();
  confirm.mockClear();
  decline.mockClear();
});

it('calls `onExpand` when expand button clicked', () => {
  const { getByTestId } = render(<TaskItem task={task} onExpand={updater} />);
  fireEvent.click(getByTestId('expand'));
  expect(updater).toHaveBeenCalled();
});

it('calls `onExpand` with relevant value', () => {
  const { getByTestId } = render(
    <TaskItem task={task} onExpand={updater} expand={true} />,
  );
  fireEvent.click(getByTestId('expand'));
  expect(updater).toHaveBeenCalledWith(false);
});

it('calls `onChange` when checkbox clicked', () => {
  const { getByTestId } = render(<TaskItem task={task} onChange={updater} />);
  fireEvent.click(getByTestId('checkbox'));
  expect(updater).toHaveBeenCalledWith({ ...task, completed: true });
});

it('calls `onChange` when title changes', () => {
  const { getByTestId } = render(<TaskItem task={task} onChange={updater} />);
  fireEvent.change(getByTestId('title'), { target: { value: 'new' } });
  expect(updater).toHaveBeenCalledWith({ ...task, title: 'new' });
});

it('calls `onChange` when description changes', () => {
  const { getByTestId } = render(<TaskItem task={task} onChange={updater} />);
  fireEvent.change(getByTestId('description'), { target: { value: 'new' } });
  expect(updater).toHaveBeenCalledWith({ ...task, description: 'new' });
});

it('requires confirmation when deleting on `confirmDelete`', () => {
  window.confirm = confirm;
  const { getByTestId } = render(
    <TaskItem task={task} onDelete={updater} confirmDelete={true} />,
  );
  fireEvent.click(getByTestId('delete'));
  expect(confirm).toHaveBeenCalledWith('Sure you want to delete this task?');
  expect(updater).toHaveBeenCalledWith(task);
});

it('calls `onDelete` when delete clicked', () => {
  const { getByTestId } = render(<TaskItem task={task} onDelete={updater} />);
  fireEvent.click(getByTestId('delete'));
  expect(updater).toHaveBeenCalledWith(task);
});

it('does not call `onDelete` without confirmation', () => {
  window.confirm = decline;
  const { getByTestId } = render(
    <TaskItem task={task} onDelete={updater} confirmDelete={true} />,
  );
  fireEvent.click(getByTestId('delete'));
  expect(updater).not.toHaveBeenCalled();
});
