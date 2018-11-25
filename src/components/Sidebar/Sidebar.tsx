import { createProject } from '@lib';
import Button from '@local/components/Button/Button';
import CalendarIcon from '@local/components/CalendarIcon/CalendarIcon';
import IconSystem from '@local/components/IconSystem/IconSystem';
import { useStore } from '@local/hooks';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.css';

function Sidebar() {
  const { tasks, projects, actions } = useStore();

  function handleAddProject() {
    actions.updateProject(createProject({ name: 'Untitled' }));
  }

  return (
    <aside className={styles.container}>
      <nav>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <IconSystem name="inbox" size={20} />{' '}
            <NavLink to="/" className={styles.link} exact>
              Inbox
            </NavLink>{' '}
            <span className={styles.slot}>{tasks.length}</span>
          </li>
          <li className={styles.listItem}>
            <CalendarIcon date={new Date()} size={18} />
            <NavLink
              activeClassName="active"
              to="/upcoming"
              exact
              className={styles.link}
            >
              Schedule
            </NavLink>
          </li>
          <li className={styles.listItem}>
            <IconSystem name="star" size={20} className={styles.starIcon} />{' '}
            <NavLink activeClassName="active" to="/today" exact className={styles.link}>
              Starred
            </NavLink>
          </li>
        </ul>
      </nav>
      <nav className={styles.section}>
        <header className={styles.sectionHeader}>
          <h1 className={styles.title}>Projects</h1>
          <Button onClick={handleAddProject}>
            <IconSystem name="plus" size={12} />
          </Button>
        </header>
        <ul className={styles.list}>
          {projects.map((p) => (
            <li key={p.id} className={styles.sectionListItem}>
              <NavLink to={`/projects/${p.id}`} className={styles.link}>
                {p.name}
              </NavLink>
              <span className={styles.slot}>{p.tasks.length}</span>
            </li>
          ))}
        </ul>
      </nav>
      <nav className={styles.section}>
        <Button className={styles.button}>
          <IconSystem name="plus" size={14} style={{ marginRight: 10 }} /> Add Workspace
        </Button>
      </nav>
      <footer className={styles.footer}>
        <Button className={styles.button}>
          <IconSystem name="dots" size={16} />
        </Button>
        <Button className={styles.button}>
          <IconSystem name="cog" size={16} />
        </Button>
      </footer>
    </aside>
  );
}

export default Sidebar;
