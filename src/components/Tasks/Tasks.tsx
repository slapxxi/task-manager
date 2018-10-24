import { Task as ITask } from '@local/types';
import { isEmpty } from 'lodash';
import * as React from 'react';
import { Button } from '../';
import { createTask, isValidTask } from '../../lib/tasks';
import styles from './styles.css';
import Task from './Task';

enum Mode {
  default,
  create,
}

interface RenderParams {
  task: ITask;
  expand: boolean;
  onExpand: (expand: boolean) => void;
}

interface Props {
  tasks: ITask[];
  onCreate?: (task: ITask) => void;
  renderTask?: (params: RenderParams) => React.ReactNode;
}

interface State {
  mode: Mode;
  newTask: ITask;
  activeItem: number;
}

class Tasks extends React.Component<Props, State> {
  private lastActiveItem: number = NaN;

  constructor(props: Props) {
    super(props);
    this.state = {
      mode: Mode.default,
      newTask: createTask({}),
      activeItem: NaN,
    };
  }

  public handleCreateTask = (task: ITask) => {
    if (isValidTask(task)) {
      this.setState(
        { mode: Mode.default, activeItem: this.props.tasks.length },
        () => {
          if (this.props.onCreate) {
            this.props.onCreate(task);
          }
        },
      );
    }
  };

  public handeEnableCreate = () => {
    this.lastActiveItem = this.state.activeItem;
    this.setState({
      mode: Mode.create,
      newTask: createTask({}),
      activeItem: NaN,
    });
  };

  public handleCancel = () => {
    this.setState({ mode: Mode.default, activeItem: this.lastActiveItem });
  };

  public handleExpand = (index: number, expand: boolean) => {
    if (expand === false) {
      return this.setState({ activeItem: NaN });
    }
    this.setState({ activeItem: index });
  };

  public render() {
    const { tasks, renderTask } = this.props;
    return (
      <>
        <ul className={styles.tasks}>
          {isEmpty(tasks) && <p>There are no tasks yet.</p>}
          {tasks.map(
            (t: ITask, index) =>
              renderTask && (
                <li key={t.id}>
                  {renderTask({
                    task: t,
                    expand: index === this.state.activeItem,
                    onExpand: (expand: boolean) =>
                      this.handleExpand(index, expand),
                  })}
                </li>
              ),
          )}
          {this.state.mode === Mode.create && (
            <Task
              task={this.state.newTask}
              onEdit={this.handleCreateTask}
              expand={true}
            />
          )}
        </ul>
        {this.state.mode === Mode.default ? (
          <Button onClick={this.handeEnableCreate}>Create Task</Button>
        ) : (
          <Button onClick={this.handleCancel}>Cancel</Button>
        )}
      </>
    );
  }
}

export default Tasks;
