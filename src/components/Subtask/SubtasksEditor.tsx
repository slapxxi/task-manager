import { createSubtask } from '@lib';
import { Subtask as ISubtask } from '@local/types';
import isEmpty from 'lodash-es/isEmpty';
import React, { useRef } from 'react';
import Subtask from './Subtask';
import Subtasks from './Subtasks';

interface Props {
  subtasks: ISubtask[];
  focus?: boolean;
  onCreate?: (subtask: ISubtask) => void;
  onEdit?: (subtask: ISubtask) => void;
  onRemove?: (subtask: ISubtask) => void;
}

function SubtasksEditor({ subtasks, focus, onCreate, onEdit, onRemove }: Props) {
  const lastFocusedRef = useRef<number>(NaN);

  function handleEdit(subtask: ISubtask) {
    if (onEdit) {
      onEdit(subtask);
    }
  }

  function handleCreate(subtask: ISubtask) {
    if (onCreate) {
      onCreate(createSubtask(subtask));
    }
  }

  function handleAdd() {
    if (onCreate) {
      onCreate(createSubtask({}));
      lastFocusedRef.current = subtasks.length;
    }
  }

  function handleRemove(subtask: ISubtask) {
    if (onRemove) {
      if (subtasks.length === 1) {
        lastFocusedRef.current = 0;
      } else {
        lastFocusedRef.current -= 1;
      }
      onRemove(subtask);
    }
  }

  function handleFocus(index: number) {
    lastFocusedRef.current = index;
  }

  function handleBlur() {
    lastFocusedRef.current = NaN;
  }

  return (
    <div>
      <Subtasks
        subtasks={isEmpty(subtasks) ? [createSubtask({})] : subtasks}
        render={({ subtask, index }) =>
          isEmpty(subtasks) && index === subtasks.length ? (
            <Subtask subtask={subtask} onEdit={handleCreate} focus />
          ) : (
            <Subtask
              focus={focus && lastFocusedRef.current === index}
              subtask={subtask}
              onEdit={handleEdit}
              onFocus={() => handleFocus(index)}
              onBlur={handleBlur}
              onRemove={handleRemove}
              onSubmit={handleAdd}
            />
          )
        }
      />
    </div>
  );
}

export default SubtasksEditor;
