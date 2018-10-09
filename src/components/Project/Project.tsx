import { Tasks, TextArea } from '@local/components';
import { Project as IProject } from '@local/types';
import * as React from 'react';
import assignToProject from '../../lib/tasks/assignToProject';
import styles from './styles.css';

interface Props {
  project: IProject;
  onEdit?: (project: IProject) => void;
  onEditTask?: (task: Task) => void;
}

// TODO Do not allow empty name when updating
class Project extends React.Component<Props, {}> {
  public handleChange = (value: string) => {
    if (this.props.onEdit) {
      this.props.onEdit({ ...this.props.project, name: value });
    }
  };

  public handleChangeTask = (task: Task) => {
    if (this.props.onEditTask) {
      this.props.onEditTask(assignToProject(task, this.props.project));
    }
  };

  public render() {
    const { project } = this.props;
    if (project === undefined) {
      return null;
    }
    return (
      <div>
        <TextArea
          value={project.name}
          placeholder="Project Name..."
          onChange={this.handleChange}
          className={styles.name}
          data-testid="name"
        />
        <Tasks tasks={project.tasks} onChange={this.handleChangeTask} />
      </div>
    );
  }
}

export default Project;
