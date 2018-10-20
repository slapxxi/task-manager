import { createSubtask } from '@lib';
import { Subtask as ISubtask } from '@local/types';
import { isEqual } from 'lodash';
import * as React from 'react';
import Subtask from './Subtask';
import Subtasks from './Subtasks';

interface Props {
  subtasks: ISubtask[];
  isEmpty?: boolean;
  focused?: boolean;
  onCreate?: (subtask: ISubtask) => void;
  onEdit?: (subtask: ISubtask) => void;
  onRemove?: (subtask: ISubtask) => void;
}

class SubtasksEditor extends React.PureComponent<Props> {
  public lastFocused =
    this.props.subtasks.length - 1 >= 0 ? this.props.subtasks.length - 1 : 0;

  public ref = React.createRef<HTMLInputElement>();

  public componentDidUpdate(prevProps: Props) {
    if (
      this.props.focused &&
      !isEqual(prevProps.subtasks, this.props.subtasks)
    ) {
      this.focus();
    }
  }

  public handleEdit = (subtask: ISubtask) => {
    if (this.props.onEdit) {
      this.props.onEdit(subtask);
    }
  };

  public handleCreate = (subtask: ISubtask) => {
    if (this.props.onCreate) {
      this.props.onCreate(createSubtask(subtask));
    }
  };

  public handleAdd = () => {
    if (this.props.onCreate) {
      this.props.onCreate(createSubtask({}));
      this.lastFocused = this.props.subtasks.length;
    }
  };

  public handleRemove = (subtask: ISubtask) => {
    if (this.props.onRemove) {
      if (this.props.subtasks.length === 1) {
        this.lastFocused = 0;
      } else {
        this.lastFocused -= 1;
      }
      this.props.onRemove(subtask);
    }
  };

  public handleFocus = (index: number) => {
    this.lastFocused = index;
  };

  public handleBlur = () => {
    this.lastFocused = NaN;
  };

  public focus = () => {
    if (this.ref.current !== null) {
      requestAnimationFrame(() => this.ref.current!.focus());
    }
  };

  public render() {
    const { subtasks, isEmpty } = this.props;
    return (
      <div>
        <Subtasks
          subtasks={isEmpty ? [...subtasks, createSubtask({})] : subtasks}
          render={({ subtask, index }) =>
            isEmpty && index === subtasks.length ? (
              <Subtask subtask={subtask} onEdit={this.handleCreate} />
            ) : (
              <Subtask
                ref={
                  (this.lastFocused === index && this.ref) as React.Ref<
                    HTMLInputElement
                  >
                }
                subtask={subtask}
                onEdit={this.handleEdit}
                onFocus={() => this.handleFocus(index)}
                onBlur={this.handleBlur}
                onRemove={this.handleRemove}
                onSubmit={this.handleAdd}
              />
            )
          }
        />
      </div>
    );
  }
}

export default SubtasksEditor;
