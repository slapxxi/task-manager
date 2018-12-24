import StoreProvider from '@local/components/Store/StoreProvider';
import React from 'react';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import { fireEvent, render } from 'react-testing-library';
import ProjectPage from './ProjectPage';

jest.mock('@local/components/IconSystem/IconSystem');
jest.mock('@local/hooks/useWorker');

const mockStore = {
  tasks: {
    'test-task': {
      title: 'Test Task',
      project: 'test-project',
      completed: false,
      createdAt: 0,
      tags: [],
      subtasks: [],
    },
  },
  tags: {},
  projects: { 'test-project': { name: 'Test Project' } },
  isLoading: false,
  isSyncing: false,
  lastUpdated: 0,
};

it('redirects to home page if there is no matching project', () => {
  const { container } = render(
    <StoreProvider>
      <Router initialEntries={['/projects/test-project']}>
        <div>
          <Route path="/" render={() => <div>Home</div>} exact />
          <Route
            path="/projects/:id"
            render={({ match }) => <ProjectPage projectID={match.params.id} />}
          />
        </div>
      </Router>
      ,
    </StoreProvider>,
  );
  expect(container.firstChild).toMatchSnapshot();
});

it('renders project', () => {
  const { container } = render(
    <StoreProvider initialValue={mockStore}>
      <Router initialEntries={['/projects/test-project']}>
        <Route
          path="/projects/:id"
          render={({ match }) => <ProjectPage projectID={match.params.id} />}
        />
      </Router>
      ,
    </StoreProvider>,
  );
  expect(container.firstChild).toMatchSnapshot();
});

it('allows to change project title', () => {
  const { getByTestId } = render(
    <StoreProvider initialValue={mockStore}>
      <Router initialEntries={['/projects/test-project']}>
        <Route
          path="/projects/:id"
          render={({ match }) => <ProjectPage projectID={match.params.id} />}
        />
      </Router>
      ,
    </StoreProvider>,
  );
  const projectName = getByTestId('project-name') as HTMLTextAreaElement;

  fireEvent.change(projectName, { target: { value: 'Changed Title' } });

  expect(projectName.value).toEqual('Changed Title');
});
