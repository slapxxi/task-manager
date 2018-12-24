import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render } from 'react-testing-library';
import TodayPage from './TodayPage';

jest.mock('@local/components/IconSystem/IconSystem');

it('renders', () => {
  const { container } = render(
    <Router>
      <TodayPage />
    </Router>,
  );
  expect(container.firstChild).toMatchSnapshot();
});
