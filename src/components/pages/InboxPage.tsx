import { TasksEditor } from '@local/components';
import IconSystem from '@local/components/IconSystem/IconSystem';
import { useStore } from '@local/hooks';
import React from 'react';
import styles from './styles.css';

function InboxPage() {
  const { tasks, actions } = useStore();
  return (
    <div className={styles.inboxPage}>
      <header className={styles.header}>
        <IconSystem name="inbox" size={30} />
        <PageTitle className={styles.title}>Inbox</PageTitle>
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

export default InboxPage;
