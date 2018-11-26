import { TasksEditor } from '@local/components';
import CalendarIcon from '@local/components/CalendarIcon/CalendarIcon';
import IconSystem from '@local/components/IconSystem/IconSystem';
import { useStore } from '@local/hooks';
import React from 'react';
import styles from './styles.css';

function UpcomingPage() {
  const { tasks, actions } = useStore();
  return (
    <div className={styles.upcomingPage}>
      <header className={styles.header}>
        <CalendarIcon date={new Date()} size={30} />
        <PageTitle className={styles.title}>Upcoming</PageTitle>
        <IconSystem name="dots" size={20} className={styles.menu} />
      </header>
      <div className={styles.content}>
        <TasksEditor
          tasks={tasks}
          onEdit={actions.updateTask}
          onDelete={actions.deleteTask}
          onCreate={actions.updateTask}
        />
      </div>
    </div>
  );
}

function PageTitle({
  children,
  ...rest
}: {
  children: React.ReactNode;
  [prop: string]: any;
}) {
  return <h1 {...rest}>{children}</h1>;
}

export default UpcomingPage;
