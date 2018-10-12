// @ts-ignore
import Tasks from '@local/components/Tasks/Tasks';
import { last } from 'lodash';
import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import { createTask } from '../../lib/tasks';
import Project from './Project';

jest.mock('@local/components/Tasks/Tasks', () => {
  return jest.fn(() => 'tasks');
});

beforeEach(() => {
  (Tasks as jest.Mock).mockClear();
});

const project = {
  id: 'test',
  name: 'Test Project',
  tasks: [],
};

it('renders project', () => {
  const { getByTestId } = render(<Project project={project} />);
  const projectName = getByTestId('name') as HTMLTextAreaElement;
  expect(projectName.value).toEqual('Test Project');
});

it('invokes callback when project modified', () => {
  const spy = jest.fn();
  const { getByTestId } = render(<Project project={project} onEdit={spy} />);
  fireEvent.change(getByTestId('name'), { target: { value: 'new name' } });
  expect(spy).toHaveBeenCalledWith({ id: 'test', name: 'new name', tasks: [] });
});

it('invokes callback when task deleted', () => {
  const spy = jest.fn();
  render(
    <Project
      project={{
        ...project,
        tasks: [createTask({ title: 'task', id: 'task' })],
      }}
      onDeleteTask={spy}
    />,
  );
  last((Tasks as jest.Mock).mock.calls)![0].onDelete({ task: 'test' });
  expect(spy).toHaveBeenCalledWith({ task: 'test' });
});
