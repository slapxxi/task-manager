import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import { createTask } from '../../lib/tasks';
import Tasks from './Tasks';

const tasks = [createTask({ title: 'first' }), createTask({ title: 'second' })];

it('renders tasks', () => {
  const { container } = render(
    <Tasks tasks={tasks} renderTask={({ task }) => <MockTask task={task} />} />,
  );
  expect(container.firstChild).toMatchSnapshot();
});

it('renders information when tasks are empty', () => {
  const { container } = render(<Tasks tasks={[]} />);
  expect(container.firstChild).toMatchSnapshot();
});

it('does not expand tasks by default', () => {
  const spy = jest.fn(() => 'task');
  render(<Tasks tasks={tasks} renderTask={({ expand }) => spy(expand)} />);
  expect(spy).toHaveBeenCalledTimes(tasks.length);
  expect(spy).toHaveBeenCalledWith(false);
});

it('does not expand more than one item', () => {
  const Item = jest.fn(({ task, expand, onExpand }) => (
    <button onClick={onExpand} data-expand={expand}>
      {task.title}
    </button>
  ));
  const { container, getByText } = render(
    <Tasks
      tasks={tasks}
      renderTask={({ task, expand, onExpand }) => (
        // @ts-ignore
        <Item task={task} expand={expand} onExpand={onExpand} />
      )}
    />,
  );
  fireEvent.click(getByText('first'));
  fireEvent.click(getByText('second'));
  expect(container.firstChild).toMatchSnapshot();
});

function MockTask({ task }: any) {
  return <div>{task.title}</div>;
}
