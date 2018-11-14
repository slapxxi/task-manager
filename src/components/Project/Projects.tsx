import { Project as IProject } from '@local/types';
import React from 'react';
import Project from './Project';

interface Props {
  projects: IProject[];
}

function Projects({ projects }: Props) {
  return (
    <div>
      {projects.map((project) => (
        <Project project={project} key={project.id} />
      ))}
    </div>
  );
}

export default Projects;
