import { TasksEditor } from '@local/components';
import Breadcrumbs from '@local/components/Breadcrumbs/Breadcrumbs';
import CalendarIcon from '@local/components/CalendarIcon/CalendarIcon';
import IconSystem from '@local/components/IconSystem/IconSystem';
import { useStore } from '@local/hooks';
import React from 'react';
import styles from './styles.css';

function UpcomingPage() {
  const { getTasks, actions } = useStore();
  return (
    <div className={styles.upcomingPage}>
      <div className={styles.toolbar}>
        <Breadcrumbs />
      </div>
      <header className={styles.header}>
        <CalendarIcon date={new Date()} size={30} />
        <h1 className={styles.title}>Upcoming</h1>
        <IconSystem name="dots" size={20} className={styles.menu} />
      </header>
      <div className={styles.content}>
        <TasksEditor
          tasks={getTasks()}
          onEdit={actions.updateTask}
          onDelete={actions.deleteTask}
          onCreate={actions.updateTask}
        />
      </div>
    </div>
  );
}

export default UpcomingPage;
