import { createSubtask, Keys } from '@lib';
import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import uuid from 'uuid';
import SubtasksEditor from './SubtasksEditor';

window.requestAnimationFrame = (fn) => setTimeout(fn, 10);

const subtasks = [
  { id: 'first', description: 'first', completed: false },
  { id: 'second', description: 'second', completed: false },
];

beforeEach(() => {
  // @ts-ignore
  uuid.__reset();
});

it('renders', () => {
  const { container } = render(<SubtasksEditor subtasks={subtasks} />);
  expect(container.firstChild).toMatchSnapshot();
});

it('invokes callback when subtask created', () => {
  const spy = jest.fn();
  const { getByTestId } = render(<SubtasksEditor subtasks={[]} onCreate={spy} isEmpty />);
  fireEvent.change(getByTestId('input'), { target: { value: 'new' } });
  expect(spy).toHaveBeenCalledWith({
    id: 'unique-id-0',
    description: 'new',
    completed: false,
  });
});

it('invokes callback when subtask submitted', () => {
  const spy = jest.fn();
  const { getByTestId } = render(
    <SubtasksEditor
      subtasks={[createSubtask({ id: 'test', description: 'existing' })]}
      onCreate={spy}
    />,
  );
  fireEvent.keyDown(getByTestId('input'), {
    keyCode: Keys.enter,
  });
  expect(spy).toHaveBeenCalledWith({
    id: 'unique-id-0',
    description: '',
    completed: false,
  });
});
