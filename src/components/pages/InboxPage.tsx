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
        <h1 className={styles.title}>Inbox</h1>
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

export default InboxPage;
