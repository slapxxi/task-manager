import { TextArea } from '@local/components';
import { Project as IProject } from '@local/types';
import * as React from 'react';
import styles from './styles.css';

interface RenderParams {
  project: IProject;
}

interface Props {
  project: IProject;
  onEdit?: (project: IProject) => void;
  renderProject?: (params: RenderParams) => React.ReactNode;
}

class Project extends React.Component<Props, {}> {
  public handleChange = (value: string) => {
    if (this.props.onEdit) {
      this.props.onEdit({ ...this.props.project, name: value });
    }
  };

  public render() {
    const { project, renderProject } = this.props;
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
          data-testid="project-name"
        />
        {renderProject && renderProject({ project })}
      </div>
    );
  }
}

export default Project;
