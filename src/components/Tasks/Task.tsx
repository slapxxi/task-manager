import { resetDeadline, setDeadline, tagTask, toggleTask } from '@lib';
import { addSubtask, getTaskProgress, removeSubtask } from '@lib/tasks';
import {
  Calendar,
  Checkbox,
  Deadline,
  Icon,
  ProgressCheckbox,
  SubtasksEditor,
  TagsEditor,
} from '@local/components';
import { Subtask, Tag, Task as ITask, UserCreatedTag } from '@local/types';
import includes from 'lodash-es/includes';
import isEmpty from 'lodash-es/isEmpty';
import isEqual from 'lodash-es/isEqual';
import React, { useState } from 'react';
import posed from 'react-pose';
import styled from 'styled-components';
import arrow_down from '../../assets/arrow_down.svg';
import arrow_up from '../../assets/arrow_up.svg';
import flag from '../../assets/flag.svg';
import list from '../../assets/list.svg';
import tag from '../../assets/tag.svg';
import trashbin from '../../assets/trashbin.svg';
import TextArea from '../TextArea/TextArea';
import styles from './styles.css';

enum Mode {
  default,
  editing,
}

interface Props {
  task: ITask;
  expand?: boolean;
  confirmDelete?: boolean;
  onEdit?: (task: ITask) => void;
  onDelete?: (task: ITask) => void;
  onExpand?: (expand: boolean) => void;
}

function Task({ task, expand, confirmDelete, onEdit, onDelete, onExpand }: Props) {
  const [mode, setMode] = useState(Mode.default);
  const [showCalendar, setShowCalendar] = useState(false);

  function handleToggle() {
    if (onEdit) {
      onEdit(toggleTask(task));
    }
  }

  function handleChangeDescription(value: string) {
    if (onEdit) {
      onEdit({ ...task, description: value });
    }
  }

  function handleChangeTitle(title: string) {
    if (onEdit) {
      onEdit({ ...task, title });
    }
  }

  function handleToggleDetails() {
    if (onExpand) {
      onExpand(!expand);
    }
  }

  function handleExpand() {
    if (onExpand) {
      onExpand(true);
    }
  }

  function handleToggleCalendar() {
    setShowCalendar((show) => !show);
  }

  function handleAddTag(newTag: UserCreatedTag) {
    if (
      !includes(task.tags.map((t) => t.name.toLowerCase()), newTag.name.toLowerCase())
    ) {
      if (onEdit) {
        onEdit(tagTask(task, newTag));
      }
    }
  }

  function handleRemoveTags(tags: Tag[]) {
    if (onEdit) {
      onEdit({
        ...task,
        tags: [
          ...(task.tags as Tag[]).filter(
            (propTag) => !includes(tags.map((t) => t.id), propTag.id),
          ),
        ],
      });
    }
  }

  function handleDelete() {
    if (onDelete) {
      if (confirmDelete) {
        const result = confirm('Sure you want to delete this task?');
        if (result) {
          onDelete(task);
        }
      } else {
        onDelete(task);
      }
      if (onExpand) {
        onExpand(false);
      }
    }
  }

  function handleAddSubtask(subtask: Subtask) {
    if (onEdit) {
      onEdit({
        ...task,
        subtasks: [...task.subtasks, subtask],
      });
    }
  }

  function handleEditSubtask(subtask: Subtask) {
    if (onEdit) {
      onEdit(addSubtask(task, subtask));
    }
  }

  function handleRemoveSubtask(subtask: Subtask) {
    if (onEdit) {
      onEdit(removeSubtask(task, subtask));
    }
  }

  function handleChangeMode() {
    setMode(mode === Mode.default ? Mode.editing : Mode.default);
  }

  function handleSelectDeadline(date: Date) {
    if (onEdit) {
      onEdit(setDeadline(task, date));
    }
    setShowCalendar(false);
  }

  function handleResetDeadline() {
    if (onEdit) {
      onEdit(resetDeadline(task));
    }
  }

  return (
    <Container active={expand} completed={task.completed}>
      <header className={styles.taskHeader}>
        {task.subtasks.length > 0 ? (
          <ProgressCheckbox
            value={task.completed}
            progress={getTaskProgress(task)}
            size={22}
          />
        ) : (
          <Checkbox
            size={22}
            value={task.completed}
            onToggle={handleToggle}
            data-testid="checkbox"
          />
        )}
        <Title
          active={expand}
          completed={task.completed}
          className={styles.taskTitle}
          value={task.title || ''}
          placeholder="Title..."
          onClick={handleExpand}
          onChange={handleChangeTitle}
          autoFocus={expand}
          data-testid="title"
        />
        {!expand && !isEmpty(task.tags) ? (
          <Icon glyph={tag} size={18} className={styles.tagIcon} />
        ) : null}
        <Icon
          glyph={expand ? arrow_up : arrow_down}
          style={{ marginLeft: 10 }}
          className={styles.detailsIcon}
          onClick={handleToggleDetails}
          data-testid="expand"
        />
      </header>
      <AnimatedDetails pose={expand ? 'open' : 'closed'} style={{ overflow: 'hidden' }}>
        <Details>
          <TextArea
            className={styles.taskDescription}
            placeholder="Notes..."
            value={task.description || ''}
            onChange={handleChangeDescription}
            data-testid="description"
          />
          <SubtasksEditor
            subtasks={task.subtasks}
            onCreate={handleAddSubtask}
            onEdit={handleEditSubtask}
            onRemove={handleRemoveSubtask}
            focused={expand}
            isEmpty={mode === Mode.editing && isEmpty(task.subtasks)}
          />
          <footer className={styles.taskFooter}>
            {task.deadline && !showCalendar ? (
              <Deadline
                deadline={task.deadline}
                onChange={handleToggleCalendar}
                onReset={handleResetDeadline}
              />
            ) : null}
            <TagsEditor
              className={styles.footerTags}
              tags={task.tags as Tag[]}
              onAddTag={handleAddTag}
              onRemoveTags={handleRemoveTags}
            />
            {onDelete && (
              <Icon
                glyph={trashbin}
                size={16}
                className={styles.footerIconDangerous}
                onClick={handleDelete}
                data-testid="delete"
              />
            )}
            {isEmpty(task.subtasks) && (
              <Icon
                glyph={list}
                size={16}
                className={styles.footerIcon}
                onClick={handleChangeMode}
              />
            )}
            <Icon
              glyph={flag}
              size={16}
              className={styles.footerIcon}
              onClick={handleToggleCalendar}
            />
            {showCalendar && (
              <Calendar selected={task.deadline} onSelectDate={handleSelectDeadline} />
            )}
          </footer>
        </Details>
      </AnimatedDetails>
    </Container>
  );
}

const Container = styled<{ active?: boolean; completed?: boolean }, 'div'>('div')`
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  padding: 15px 10px;
  background-color: ${({ active }) => (active ? '#fff' : 'transparent')};
  color: ${({ completed }) => (completed ? 'lightgrey' : '#334')};
  box-shadow: ${({ active }) => (active ? '0 1px 3px 2px rgba(0,0,0,0.1)' : 'none')};
`;

const Title = styled(TextArea)`
  text-decoration: ${({ completed }: any) => (completed ? 'line-through' : 'none')};
  color: ${({ active }: any) => (active ? '#112' : '#445')};
  color: ${({ completed }: any) => (completed ? '#b3b3bb' : null)};
`;

const AnimatedDetails = posed.div({
  open: {
    height: 'auto',
    opacity: 1,
    transition: {
      duration: 200,
    },
  },
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 200,
    },
  },
});

const Details = styled.div`
  overflow: hidden;
  box-sizing: border-box;
  margin-left: calc(1em + 20px);
  padding: 10px 0 0;
`;

export default React.memo(Task, (prevProps, nextProps) => isEqual(prevProps, nextProps));
