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

interface Props {
  tasks: ITask[];
  onChange?: (task: ITask) => void;
  onDelete?: (task: ITask) => void;
}

interface State {
  mode: Mode;
  activeItem: number;
  newTask: ITask;
}

class Tasks extends React.Component<Props, State> {
  private lastActiveItem: number = NaN;

  constructor(props: Props) {
    super(props);
    this.state = {
      mode: Mode.default,
      newTask: createTask(),
      activeItem: NaN,
    };
  }

  public handleCreateTask = () => {
    this.lastActiveItem = this.state.activeItem;
    this.setState({
      mode: Mode.create,
      newTask: createTask(),
      activeItem: NaN,
    });
  };

  public handleCancel = () => {
    this.setState({ mode: Mode.default, activeItem: this.lastActiveItem });
  };

  public handleDeleteTask = (task: ITask) => {
    if (this.props.onDelete) {
      this.setState({ activeItem: NaN }, () => {
        if (this.props.onDelete) {
          this.props.onDelete(task);
        }
      });
    }
  };

  public handleExpand = (index: number, expand: boolean) => {
    if (expand === false) {
      return this.setState({ activeItem: NaN });
    }
    this.setState({ activeItem: index });
  };

  public createTask = (task: ITask) => {
    if (isValidTask(task)) {
      this.setState(
        { mode: Mode.default, activeItem: this.props.tasks.length },
        () => {
          if (this.props.onChange) {
            this.props.onChange(task);
          }
        },
      );
    }
  };

  public render() {
    const { tasks, onChange } = this.props;
    return (
      <>
        <ul className={styles.tasks}>
          {isEmpty(tasks) && <p>There are no tasks yet.</p>}
          {tasks.map((t: ITask, index) => (
            <Task
              key={t.id}
              task={t}
              onChange={onChange}
              onDelete={this.handleDeleteTask}
              onExpand={(expand) => this.handleExpand(index, expand)}
              confirmDelete={true}
              expand={index === this.state.activeItem}
            />
          ))}
          {this.state.mode === Mode.create && (
            <Task
              task={this.state.newTask}
              onChange={this.createTask}
              expand={true}
              data-testid="newTask"
            />
          )}
        </ul>
        {this.state.mode === Mode.default ? (
          <Button onClick={this.handleCreateTask} data-testid="create">
            Create Task
          </Button>
        ) : (
          <Button onClick={this.handleCancel}>Cancel</Button>
        )}
      </>
    );
  }
}

export default Tasks;
