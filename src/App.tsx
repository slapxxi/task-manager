import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import StoreProvider from './components/Store/StoreProvider';

const InboxPage = React.lazy(() => import('./components/pages/InboxPage'));
const ProjectsPage = React.lazy(() => import('./components/pages/ProjectsPage'));
const ProjectPage = React.lazy(() => import('./components/pages/ProjectPage'));
const TagsPage = React.lazy(() => import('./components/pages/TagsPage'));

function App() {
  return (
    <StoreProvider>
      <Router>
        <div>
          <Menu />
          <Suspense fallback={<div>Loading Page...</div>}>
            <Switch>
              <Route path="/" exact render={() => <InboxPage />} />
              <Route path="/projects" exact render={() => <ProjectsPage />} />
              <Route path="/tags" render={() => <TagsPage />} />
              <Route
                path="/projects/:id"
                render={({ match }) => <ProjectPage projectID={match.params.id} />}
              />
            </Switch>
          </Suspense>
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;
