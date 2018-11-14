import box from '@local/assets/box.svg';
import { Icon, TasksEditor } from '@local/components';
import { useStore } from '@local/hooks';
import React from 'react';
import styles from './styles.css';

function SomedayPage() {
  const { tasks, actions } = useStore();
  return (
    <div className={styles.somedayPage}>
      <header className={styles.header}>
        <Icon glyph={box} size={30} />
        <PageTitle className={styles.title}>Someday</PageTitle>
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

export default SomedayPage;
