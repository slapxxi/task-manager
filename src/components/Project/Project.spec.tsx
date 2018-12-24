// @ts-ignore
import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import Project from './Project';

jest.mock('@local/components/IconSystem/IconSystem', () => () => 'icon');
jest.mock('@local/hooks/useWorker');

const project = {
  id: 'test',
  name: 'Test Project',
  tasks: [],
};

it('renders project', () => {
  const { container } = render(<Project project={project} />);
  expect(container.firstChild).toMatchSnapshot();
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
