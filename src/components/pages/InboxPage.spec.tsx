import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render } from 'react-testing-library';
import InboxPage from './InboxPage';

jest.mock('@local/components/IconSystem/IconSystem');

it('renders', () => {
  const { container } = render(
    <Router>
      <InboxPage />
    </Router>,
  );
  expect(container.firstChild).toMatchSnapshot();
});
