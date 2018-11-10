import { TasksEditor } from '@local/components';
import { useStore } from '@local/hooks';
import React from 'react';
import styles from './styles.css';

function InboxPage() {
  const { tasks, actions, isLoading } = useStore();
  if (isLoading) {
    return <div>Loading State...</div>;
  }
  return (
    <div className={styles.inboxPage}>
      <PageTitle className={styles.title}>Inbox</PageTitle>
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

export default InboxPage;
