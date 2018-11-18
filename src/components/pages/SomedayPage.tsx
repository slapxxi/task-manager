import { TasksEditor } from '@local/components';
import IconSystem from '@local/components/IconSystem/IconSystem';
import { useStore } from '@local/hooks';
import React from 'react';
import styles from './styles.css';

function SomedayPage() {
  const { tasks, actions } = useStore();
  return (
    <div className={styles.somedayPage}>
      <header className={styles.header}>
        <IconSystem name="box" size={30} />
        <h1 className={styles.title}>Someday</h1>
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

export default SomedayPage;
