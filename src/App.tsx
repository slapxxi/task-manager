import * as React from 'react';
import { Store, StoreProvider, Tasks } from './components';

class App extends React.Component<{}, {}> {
  public render() {
    return (
      <StoreProvider>
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
