import { getProjectProgress } from '@lib';
import { ProgressCheckbox, TextArea } from '@local/components';
import Button from '@local/components/Button/Button';
import IconSystem from '@local/components/IconSystem/IconSystem';
import { Project as IProject } from '@local/types';
import React from 'react';
import styles from './styles.css';

interface Props {
  project: IProject;
  children?: React.ReactNode;
  onEdit?: (project: IProject) => void;
}

function Project({ project, onEdit, children }: Props) {
  if (project === undefined) {
    return null;
  }

  function handleChange(value: string) {
    if (onEdit) {
      onEdit({ ...project, name: value });
    }
  }

  return (
    <div>
      <div className={styles.title}>
        <ProgressCheckbox size={22} progress={getProjectProgress(project)} />
        <TextArea
          className={styles.name}
          placeholder="Project Name..."
          value={project.name}
          onChange={handleChange}
          data-testid="project-name"
        />
        <Button>
          <IconSystem name="dots" size={22} />
        </Button>
      </div>
      <div className={styles.subtitle}>{project.tasks.length} tasks</div>
      {children}
    </div>
  );
}

export default Project;
