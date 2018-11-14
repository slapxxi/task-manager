import { TasksEditor } from '@local/components';
import CalendarIcon from '@local/components/CalendarIcon/CalendarIcon';
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
      </header>
      <TasksEditor
        tasks={tasks}
        onEdit={actions.updateTask}
        onDelete={actions.deleteTask}
        onCreate={actions.updateTask}
      />
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
