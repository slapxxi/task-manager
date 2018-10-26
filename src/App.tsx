import {
  InboxPage,
  Menu,
  ProjectPage,
  ProjectsPage,
  StoreProvider,
} from '@local/components';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <StoreProvider>
      <Router>
        <div>
          <Menu />
          <Route path="/" exact render={() => <InboxPage />} />
          <Route path="/projects" exact render={() => <ProjectsPage />} />
          <Route
            path="/projects/:id"
            render={({ match }) => <ProjectPage projectID={match.params.id} />}
          />
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;
