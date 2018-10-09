import { Tasks, TextArea } from '@local/components';
import { Project as IProject } from '@local/types';
import * as React from 'react';
import styles from './styles.css';

interface Props {
  project: IProject;
  onEdit?: (project: IProject) => void;
}

class Project extends React.Component<Props, {}> {
  public handleChange = (value: string) => {
    if (this.props.onEdit) {
      this.props.onEdit({ ...this.props.project, name: value });
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
        <Tasks tasks={project.tasks} />
      </div>
    );
  }
}

export default Project;
