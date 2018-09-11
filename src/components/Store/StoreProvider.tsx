import * as React from 'react';
import { deleteTask, pollTasks, updateTask } from '../../services';
import { Provider } from './context';

interface Props {
  children: React.ReactNode;
}

interface State {
  store: any;
}

class StoreProvider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.updateTask = this.updateTask.bind(this);
    this.state = {
      store: {
        tasks: [],
        updateTask: this.updateTask,
        deleteTask: this.deleteTask,
      },
    };
  }

  public updateTask(task: Task) {
    updateTask(task);
  }

  public deleteTask(task: Task) {
    deleteTask(task);
  }

  public componentDidMount() {
    pollTasks((tasks) =>
      this.setState({ store: { ...this.state.store, tasks } }),
    );
  }

  public render() {
    return <Provider value={this.state.store}>{this.props.children}</Provider>;
  }
}

export default StoreProvider;
