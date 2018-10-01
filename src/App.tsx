import * as React from 'react';
import { Menu, Store, StoreProvider, Tasks } from './components';

class App extends React.Component<{}, {}> {
  public render() {
    return (
      <StoreProvider>
        <Menu />
        <Store>
          {({ tasks, actions }) => (
            <Tasks
              tasks={tasks}
              onChange={actions.updateTask}
              onDelete={actions.deleteTask}
            />
          )}
        </Store>
      </StoreProvider>
    );
  }
}

export default App;
