import Menu from '@local/components/Menu/Menu';
import StoreProvider from '@local/components/Store/StoreProvider';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const InboxPage = React.lazy(() =>
  import(/* webpackChunkName: "inbox" */ '@local/components/pages/InboxPage'),
);
const ProjectsPage = React.lazy(() =>
  import(/* webpackChunkName: "projects" */ '@local/components/pages/ProjectsPage'),
);
const ProjectPage = React.lazy(() =>
  import(/* webpackChunkName: "project" */ '@local/components/pages/ProjectPage'),
);
const TagsPage = React.lazy(() =>
  import(/* webpackChunkName: "tags" */ '@local/components/pages/TagsPage'),
);

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
