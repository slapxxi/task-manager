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
  onChange: (task: Task) => void;
  onDelete: (task: Task) => void;
}

interface State {
  mode: Mode;
  newTask?: Task;
}

class Tasks extends React.Component<Props, State> {
  public state = { mode: Mode.default, newTask: createTask() };

  public handleCreateTask = () => {
    this.setState({ mode: Mode.create, newTask: createTask() });
  };

  public handleCancel = () => {
    this.setState({ mode: Mode.default });
  };

  public handleDeleteTask = (task: Task) => {
    this.props.onDelete(task);
  };

  public createTask = (task: Task) => {
    if (isValidTask(task)) {
      this.setState({ mode: Mode.default }, () => {
        this.props.onChange(task);
      });
    }
  };

  public render() {
    const { tasks, onChange } = this.props;
    return (
      <>
        <ul className={styles.tasks}>
          {tasks.map((t: Task) => (
            <TaskItem
              key={t.id}
              task={t}
              onChange={onChange}
              onDelete={this.handleDeleteTask}
            />
          ))}
          {this.state.mode === Mode.create && (
            <TaskItem task={this.state.newTask} onChange={this.createTask} />
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
