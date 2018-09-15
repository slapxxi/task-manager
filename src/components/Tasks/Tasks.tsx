import * as React from 'react';
import { Button } from '../';
import { createTask, isValidTask } from '../../lib/tasks';
import styles from './styles.css';
import TaskItem from './TaskItem';

enum Mode {
  default,
  create,
}

interface Props {
  tasks: Task[];
  onChange?: (task: Task) => void;
  onDelete?: (task: Task) => void;
}

interface State {
  mode: Mode;
  activeItem: number;
  newTask: Task;
}

class Tasks extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      mode: Mode.default,
      newTask: createTask(),
      activeItem: props.tasks.length - 1,
    };
  }

  public handleCreateTask = () => {
    this.setState({ mode: Mode.create, newTask: createTask() });
  };

  public handleCancel = () => {
    this.setState({ mode: Mode.default });
  };

  public handleDeleteTask = (task: Task) => {
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

  public createTask = (task: Task) => {
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
          {tasks.map((t: Task, index) => (
            <TaskItem
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
            <TaskItem
              task={this.state.newTask}
              onChange={this.createTask}
              expand={true}
            />
          )}
        </ul>
        {this.state.mode === Mode.default ? (
          <Button onClick={this.handleCreateTask}>Create Task</Button>
        ) : (
          <Button onClick={this.handleCancel}>Cancel</Button>
        )}
      </>
    );
  }
}

export default Tasks;
