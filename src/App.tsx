import Menu from '@local/components/Menu/Menu';
import Placeholder from '@local/components/Placeholder/Placeholder';
import StoreProvider from '@local/components/Store/StoreProvider';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const InboxPage = React.lazy(() =>
  import(/* webpackChunkName: "inbox" */ '@local/components/pages/InboxPage'),
);
const TodayPage = React.lazy(() =>
  import(/* webpackChunkName: "today" */ '@local/components/pages/TodayPage'),
);
const UpcomingPage = React.lazy(() =>
  import(/* webpackChunkName: "upcoming" */ '@local/components/pages/UpcomingPage'),
);
const SomedayPage = React.lazy(() =>
  import(/* webpackChunkName: "someday" */ '@local/components/pages/SomedayPage'),
);
const LogbookPage = React.lazy(() =>
  import(/* webpackChunkName: "logbook" */ '@local/components/pages/LogbookPage'),
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
const SettingsPage = React.lazy(() =>
  import(/* webpackChunkName: "settings" */ '@local/components/pages/SettingsPage'),
);
const TrashPage = React.lazy(() =>
  import(/* webpackChunkName: "trash" */ '@local/components/pages/TrashPage'),
);

function App() {
  return (
    <StoreProvider>
      <Router>
        <div>
          <Menu />
          <Suspense fallback={<Placeholder />}>
            <Switch>
              <Route path="/" exact render={() => <InboxPage />} />
              <Route path="/today" render={() => <TodayPage />} />
              <Route path="/someday" render={() => <SomedayPage />} />
              <Route path="/upcoming" render={() => <UpcomingPage />} />
              <Route path="/logbook" render={() => <LogbookPage />} />
              <Route path="/projects" exact render={() => <ProjectsPage />} />
              <Route path="/tags" render={() => <TagsPage />} />
              <Route path="/settings" render={() => <SettingsPage />} />
              <Route path="/trash" render={() => <TrashPage />} />
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
