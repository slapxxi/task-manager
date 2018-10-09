import { Project as IProject } from '@local/types';
import * as React from 'react';
import Project from './Project';

interface Props {
  projects: IProject[];
}

class Projects extends React.Component<Props, {}> {
  public render() {
    const { projects } = this.props;
    return (
      <div>
        {projects.map((p) => (
          <Project project={p} key={p.id} />
        ))}
      </div>
    );
  }
}

export default Projects;
