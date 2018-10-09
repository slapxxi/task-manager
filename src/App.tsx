import {
  InboxPage,
  Menu,
  ProjectPage,
  ProjectsPage,
  StoreProvider,
} from '@local/components';
import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// TODO Fix new task item remaining expanded when clicking existing task item
// TODO Display sync icon when connecting to a server
// TODO Add projects to organize tasks
// TODO Higher order component for input behavior modification?
// TODO Validate user input
// TODO Handle Errors
class App extends React.Component<{}, {}> {
  public render() {
    return (
      <StoreProvider>
        <Router>
          <div>
            <Menu />
            <Route path="/" exact render={() => <InboxPage />} />
            <Route path="/projects" exact render={() => <ProjectsPage />} />
            <Route
              path="/projects/:id"
              render={({ match }) => (
                <ProjectPage projectID={match.params.id} />
              )}
            />
          </div>
        </Router>
      </StoreProvider>
    );
  }
}

export default App;
