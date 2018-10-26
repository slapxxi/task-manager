import { Subtask as ISubtask } from '@local/types';
import * as React from 'react';
import styles from './styles.css';

interface Props {
  subtasks: ISubtask[];
  render?: (params: { subtask: ISubtask; index: number }) => React.ReactNode;
}

function Subtasks({ subtasks, render }: Props) {
  return (
    <ul className={styles.subtasks}>
      {subtasks.map((st, index) => (
        <li key={st.id} className={styles.subtask}>
          {render && render({ subtask: st, index })}
        </li>
      ))}
    </ul>
  );
}

export default React.memo(Subtasks);
