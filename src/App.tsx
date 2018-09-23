import * as React from 'react';
import { Menu, Store, StoreProvider, Tasks } from './components';

class App extends React.Component<{}, {}> {
  public render() {
    return (
      <StoreProvider>
        <Menu />
        <Store>
          {({ tasks, updateTask, deleteTask }) => (
            <Tasks tasks={tasks} onChange={updateTask} onDelete={deleteTask} />
          )}
        </Store>
      </StoreProvider>
    );
  }
}

export default App;
