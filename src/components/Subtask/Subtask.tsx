import { Keys } from '@lib';
import { Input } from '@local/components';
import { Subtask as ISubtask } from '@local/types';
import * as React from 'react';
import styles from './styles.css';

interface Props {
  subtask: ISubtask;
  forwardedRef?: React.Ref<any>;
  onEdit?: (subtask: ISubtask) => void;
  onFocus?: (subtask: ISubtask) => void;
  onBlur?: (subtask: ISubtask) => void;
  onSubmit?: (subtask: ISubtask) => void;
  onRemove?: (subtask: ISubtask) => void;
}

class Subtask extends React.PureComponent<Props> {
  public handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { subtask, onEdit } = this.props;
    if (onEdit) {
      onEdit({ ...subtask, completed: e.currentTarget.checked });
    }
  };

  public handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { subtask, onEdit } = this.props;
    if (onEdit) {
      onEdit({ ...subtask, description: e.currentTarget.value });
    }
  };

  public handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCode = e.keyCode || e.charCode;
    if (
      this.props.onRemove &&
      keyCode === Keys.backspace &&
      e.currentTarget.value === ''
    ) {
      this.props.onRemove(this.props.subtask);
      return;
    }
    if (this.props.onSubmit && keyCode === Keys.enter) {
      this.props.onSubmit(this.props.subtask);
      return;
    }
  };

  public handleFocus = () => {
    if (this.props.onFocus) {
      this.props.onFocus(this.props.subtask);
    }
  };

  public handleBlur = () => {
    if (this.props.onBlur) {
      this.props.onBlur(this.props.subtask);
    }
  };

  public render() {
    const { subtask, forwardedRef } = this.props;
    return (
      <div className={styles.container}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={subtask.completed}
          onChange={this.handleCheck}
        />
        {subtask.completed ? (
          <div className={styles.description}>{subtask.description}</div>
        ) : (
          <Input
            type="text"
            value={subtask.description}
            placeholder="What should be done..."
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onChange={this.handleEdit}
            onKeyDown={this.handleKeyDown}
            ref={forwardedRef}
            data-testid="input"
          />
        )}
      </div>
    );
  }
}

export default React.forwardRef((props: Props, ref) => {
  return <Subtask {...props} forwardedRef={ref} />;
});
