import { createProject, getProjectProgress } from '@lib';
import selectTodayTasks from '@lib/selectTodayTasks';
import Button from '@local/components/Button/Button';
import CalendarIcon from '@local/components/CalendarIcon/CalendarIcon';
import IconSystem from '@local/components/IconSystem/IconSystem';
import ProgressCheckbox from '@local/components/ProgressCheckbox/ProgressCheckbox';
import { useStore } from '@local/hooks';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './styles.css';

function Sidebar() {
  const { getProjects, getTasks, actions } = useStore();
  const todayTasks = selectTodayTasks(getTasks());

  function handleAddProject() {
    actions.updateProject(createProject({ name: 'Untitled' }));
  }

  return (
    <aside className={styles.container}>
      <header className={styles.header}>
        <IconSystem name="logo" size={20} /> <IconSystem name="dots" size={20} />{' '}
      </header>

      <nav>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <IconSystem name="inbox" size={20} />{' '}
            <NavLink to="/" className={styles.link} exact>
              Inbox
            </NavLink>{' '}
            <span className={styles.slot}>{getTasks().length}</span>
          </li>
          <li className={styles.listItem}>
            <IconSystem name="star" size={20} className={styles.starIcon} />{' '}
            <NavLink activeClassName="active" to="/today" exact className={styles.link}>
              Today
            </NavLink>
            <span className={styles.slot}>{todayTasks.length}</span>
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
        </ul>
      </nav>

      <nav className={styles.section}>
        <header className={styles.sectionHeader}>
          <h1 className={styles.title}>
            <NavLink to="/projects" className={styles.link} exact>
              Projects
            </NavLink>
          </h1>
          <Button onClick={handleAddProject}>
            <IconSystem name="plus" size={12} />
          </Button>
        </header>

        <ul className={styles.list}>
          {getProjects().map((p) => (
            <li key={p.id} className={styles.sectionListItem}>
              <NavLink to={`/projects/${p.id}`} className={styles.link}>
                {p.name}
              </NavLink>
              <span className={styles.slot}>
                {getProjectProgress(p) === 1 ? (
                  <IconSystem name="checkmark" size={14} />
                ) : (
                  <ProgressCheckbox
                    progress={getProjectProgress(p)}
                    size={14}
                    animate={false}
                  />
                )}
              </span>
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
          <IconSystem name="plus" size={14} />
        </Button>
        <Link to="/settings" className={styles.button}>
          <IconSystem name="cog" size={16} />
        </Link>
      </footer>
    </aside>
  );
}

export default Sidebar;
