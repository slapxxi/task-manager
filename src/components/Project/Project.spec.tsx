// @ts-ignore
import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import Project from './Project';

const project = {
  id: 'test',
  name: 'Test Project',
  tasks: [],
};

it('renders a project', () => {
  const spy = jest.fn(() => 'project');
  const { container } = render(
    <Project project={project} renderProject={() => spy()} />,
  );
  expect(container.firstChild).toMatchSnapshot();
});

it('passes project to render prop', () => {
  const spy = jest.fn(() => 'project');
  render(
    <Project project={project} renderProject={({ project: p }) => spy(p)} />,
  );
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith(project);
});

it('calls `onEdit` when project is modified', () => {
  const spy = jest.fn();
  const { getByTestId } = render(<Project project={project} onEdit={spy} />);
  fireEvent.change(getByTestId('project-name'), {
    target: { value: 'New Project' },
  });
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith({
    id: 'test',
    name: 'New Project',
    tasks: [],
  });
});
