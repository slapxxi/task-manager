import { isEqual } from 'lodash';
import * as React from 'react';
import {
  deleteTask,
  pollDatabase,
  stopPolling,
  updateProject,
  updateTask,
} from '../../services';
import { Provider } from './context';

interface Props {
  store?: StoreState;
  children: React.ReactNode;
}

interface State {
  store: StoreState;
}

class StoreProvider extends React.Component<Props, State> {
  public fn: (params: any) => void = () => null;

  constructor(props: Props) {
    super(props);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.state = {
      store: props.store || {
        tasks: [],
        tags: [],
        projects: [],
      },
    };
  }

  public shouldComponentUpdate(_: Props, nextState: State) {
    if (isEqual(this.state.store, nextState.store)) {
      return false;
    }
    return true;
  }

  public updateProject(project: Project) {
    updateProject(project);
  }

  public updateTask(task: Task) {
    updateTask(task, this.state.store.tags);
  }

  public deleteTask(task: Task) {
    deleteTask(task);
  }

  public componentDidMount() {
    this.fn = pollDatabase((database) =>
      this.setState({ store: { ...this.state.store, ...database } }),
    );
  }

  public componentWillUnmount() {
    stopPolling(this.fn);
  }

  public render() {
    return (
      <Provider
        value={{
          ...this.state.store,
          actions: {
            updateTask: this.updateTask,
            updateProject: this.updateProject,
            deleteTask: this.deleteTask,
          },
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export default StoreProvider;
