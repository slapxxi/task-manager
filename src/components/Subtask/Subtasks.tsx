import { Subtask as ISubtask } from '@local/types';
import * as React from 'react';
import styles from './styles.css';

interface RenderParams {
  subtask: ISubtask;
  index: number;
}

interface Props {
  subtasks: ISubtask[];
  render?: (params: RenderParams) => React.ReactNode;
}

class Subtasks extends React.Component<Props, {}> {
  public render() {
    const { subtasks, render } = this.props;
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
}

export default Subtasks;
