import { createProject } from '@lib';
import { Button, ProgressCheckbox } from '@local/components';
import { useStore } from '@local/hooks';
import { Project } from '@local/types';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.css';

function ProjectsPage() {
  const { projects, actions } = useStore();
  return (
    <div>
      <h1 className={styles.title}>Projects</h1>
      <>
        <ul className={styles.list}>
          {projects.map((p) => (
            <li key={p.id} className={styles.listItem}>
              <ProgressCheckbox progress={getProjectProgress(p)} />
              <Link to={`/projects/${p.id}`} className={styles.link}>
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
        <Button
          onClick={() => actions.updateProject(createProject({ name: 'Untitled' }))}
        >
          Create Project
        </Button>
      </>
    </div>
  );
}

function getProjectProgress(project: Project) {
  return project.tasks.filter((t) => t.completed).length / project.tasks.length;
}

export default ProjectsPage;
