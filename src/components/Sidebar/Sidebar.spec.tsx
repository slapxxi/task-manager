import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render } from 'react-testing-library';
import Sidebar from './Sidebar';

jest.mock('@local/components/IconSystem/IconSystem');
jest.mock('@local/components/CalendarIcon/CalendarIcon');

it('renders', () => {
  const { container } = render(
    <Router>
      <Sidebar />
    </Router>,
  );
  expect(container.firstChild).toMatchSnapshot();
});
