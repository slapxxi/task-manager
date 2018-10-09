import { Store } from '@local/components';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.css';

function ProjectsPage() {
  return (
    <div>
      <h1 className={styles.title}>Projects</h1>
      <Store>
        {({ projects }) => (
          <ul className={styles.list}>
            {projects.map((p) => (
              <li key={p.id} className={styles.listItem}>
                <Link to={`/projects/${p.id}`} className={styles.link}>
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Store>
    </div>
  );
}

export default ProjectsPage;
