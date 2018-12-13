import { createProject, getProjectProgress } from '@lib';
import { Button, ProgressCheckbox } from '@local/components';
import { useStore } from '@local/hooks';
import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import styles from './styles.css';

function ProjectsPage() {
  const { getProjects, actions } = useStore();
  const projects = getProjects();

  return (
    <div className={styles.projectsPage}>
      <header className={styles.toolbar}>
        <Breadcrumbs />
      </header>
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

export default ProjectsPage;
