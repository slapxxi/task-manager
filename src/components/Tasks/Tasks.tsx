import { Task as ITask } from '@local/types';
import isEmpty from 'lodash-es/isEmpty';
import React from 'react';
import styles from './styles.css';

interface Props {
  tasks: ITask[];
  children?: (params: { task: ITask; index: number }) => React.ReactNode;
}

function Tasks({ tasks, children }: Props) {
  if (isEmpty(tasks)) {
    return <p>Tasks are empty.</p>;
  }
  return (
    <ul className={styles.tasks}>
      {tasks.map((t, index) => (
        <li key={t.id}>{children && children({ task: t, index })}</li>
      ))}
    </ul>
  );
}

export default Tasks;
