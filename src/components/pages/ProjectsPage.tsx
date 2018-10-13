import { createProject } from '@lib';
import { Button, Store } from '@local/components';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.css';

function ProjectsPage() {
  return (
    <div>
      <h1 className={styles.title}>Projects</h1>
      <Store>
        {({ projects, actions }) => (
          <>
            <ul className={styles.list}>
              {projects.map((p) => (
                <li key={p.id} className={styles.listItem}>
                  <Link to={`/projects/${p.id}`} className={styles.link}>
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Button
              onClick={() =>
                actions.updateProject(createProject({ name: 'Untitled' }))
              }
            >
              Create Project
            </Button>
          </>
        )}
      </Store>
    </div>
  );
}

export default ProjectsPage;
