import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render } from 'react-testing-library';
import ProjectsPage from './ProjectsPage';

jest.mock('@local/components/IconSystem/IconSystem');

it('renders', () => {
  const { container } = render(
    <Router>
      <ProjectsPage />
    </Router>,
  );
  expect(container.firstChild).toMatchSnapshot();
});
