import React from 'react';
import { render } from 'react-testing-library';
import { createTask } from '../../lib/tasks';
import Tasks from './Tasks';

const tasks = [createTask({ title: 'first' }), createTask({ title: 'second' })];

it('renders tasks', () => {
  const { container } = render(
    <Tasks tasks={tasks}>{({ task }) => <MockTask task={task} />}</Tasks>,
  );
  expect(container.firstChild).toMatchSnapshot();
});

it('renders information when tasks are empty', () => {
  const { container } = render(<Tasks tasks={[]} />);
  expect(container.firstChild).toMatchSnapshot();
});

function MockTask({ task }: any) {
  return <div>{task.title}</div>;
}
