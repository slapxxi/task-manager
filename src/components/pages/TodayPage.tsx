import star from '@local/assets/star.svg';
import { Icon, TasksEditor } from '@local/components';
import { useStore } from '@local/hooks';
import React from 'react';
import styles from './styles.css';

function TodayPage() {
  const { tasks, actions } = useStore();
  return (
    <div className={styles.todayPage}>
      <header className={styles.header}>
        <Icon glyph={star} size={30} />
        <PageTitle className={styles.title}>Today</PageTitle>
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

export default TodayPage;
