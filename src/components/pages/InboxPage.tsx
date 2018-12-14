import { TasksEditor } from '@local/components';
import IconSystem from '@local/components/IconSystem/IconSystem';
import Spinner from '@local/components/Spinner/Spinner';
import { useStore } from '@local/hooks';
import React from 'react';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import styles from './styles.css';

function InboxPage() {
  const { state, getTasks, actions } = useStore();
  const tasks = getTasks();

  return (
    <div className={styles.inboxPage}>
      <div className={styles.toolbar}>
        <Breadcrumbs />
      </div>
      <header className={styles.header}>
        <IconSystem name="inbox" size={30} />
        <h1 className={styles.title}>Inbox</h1>
        <IconSystem name="dots" size={20} className={styles.menu} />
      </header>
      <div className={styles.content}>
        {state.isLoading ? (
          <Spinner />
        ) : (
          <TasksEditor
            tasks={tasks}
            onEdit={actions.updateTask}
            onDelete={actions.deleteTask}
            onCreate={actions.updateTask}
          />
        )}
      </div>
    </div>
  );
}

export default InboxPage;
