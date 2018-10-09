import React from 'react';
import { render } from 'react-testing-library';
import Project from './Project';

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
