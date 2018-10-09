import { Menu, Projects, Store, StoreProvider, Tasks } from '@local/components';
import * as React from 'react';

// TODO Display sync icon when connecting to a server
// TODO Add projects to organize tasks
// TODO Higher order component for input behavior modification?
// TODO Validate user input
// TODO Handle Errors
class App extends React.Component<{}, {}> {
  public componentDidCatch() {
    console.log('error');
  }

  public render() {
    return (
      <StoreProvider>
        <Menu />
        <Store>
          {({ projects, tasks, actions }) => (
            <div>
              <Tasks
                tasks={tasks}
                onChange={actions.updateTask}
                onDelete={actions.deleteTask}
              />
              <Projects projects={projects} />
            </div>
          )}
        </Store>
      </StoreProvider>
    );
  }
}

export default App;
