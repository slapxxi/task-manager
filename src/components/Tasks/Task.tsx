import { Task as ITask } from '@local/types';
import { includes, isEmpty } from 'lodash';
import * as React from 'react';
import posed from 'react-pose';
import styled from 'styled-components';
import { Icon, Tags } from '..';
import arrow_down from '../../assets/arrow_down.svg';
import arrow_up from '../../assets/arrow_up.svg';
import flag from '../../assets/flag.svg';
import list from '../../assets/list.svg';
import tag from '../../assets/tag.svg';
import trashbin from '../../assets/trashbin.svg';
import { toggleTask } from '../../lib/tasks';
import TextArea from '../TextArea/TextArea';
import styles from './styles.css';

interface Props {
  task: ITask;
  expand?: boolean;
  confirmDelete?: boolean;
  onEdit?: (task: ITask) => void;
  onDelete?: (task: ITask) => void;
  onExpand?: (expand: boolean) => void;
}

class Task extends React.PureComponent<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.state = { showDetails: this.props.expand ? true : false };
  }

  public handleToggle = () => {
    const { task, onEdit } = this.props;
    if (onEdit) {
      onEdit(toggleTask(task));
    }
  };

  public handleChangeDescription = (value: string) => {
    const { task, onEdit } = this.props;
    if (onEdit) {
      onEdit({ ...task, description: value });
    }
  };

  public handleChangeTitle = (title: string) => {
    const { task, onEdit } = this.props;
    if (onEdit) {
      onEdit({ ...task, title });
    }
  };

  public handleToggleDetails = () => {
    if (this.props.onExpand) {
      this.props.onExpand(!this.props.expand);
    }
  };

  public handleExpand = () => {
    if (this.props.onExpand) {
      this.props.onExpand(true);
    }
  };

  public handleAddTag = (name: string) => {
    if (
      !includes(this.props.task.tags.map((t) => t.name.toLowerCase()), name)
    ) {
      if (this.props.onEdit) {
        const { task } = this.props;
        this.props.onEdit({ ...task, tags: [...task.tags, { name }] });
      }
    }
  };

  public handleRemoveTag = (inputTag: Tag) => {
    if (this.props.onEdit) {
      this.props.onEdit({
        ...this.props.task,
        tags: [...this.props.task.tags.filter((t) => t.id !== inputTag.id)],
      });
    }
  };

  public handleDelete = () => {
    const { onDelete, confirmDelete } = this.props;
    if (onDelete) {
      if (confirmDelete) {
        const result = confirm('Sure you want to delete this task?');
        if (result) {
          onDelete(this.props.task);
        }
      } else {
        onDelete(this.props.task);
      }
    }
  };

  public render() {
    const { task, expand } = this.props;
    return (
      <Container active={expand} completed={task.completed}>
        <header className={styles.taskHeader}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={task.completed}
            onChange={this.handleToggle}
            data-testid="checkbox"
          />
          <Title
            active={expand}
            completed={task.completed}
            className={styles.taskTitle}
            value={task.title || ''}
            placeholder="Title..."
            onClick={this.handleExpand}
            onChange={this.handleChangeTitle}
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
            onClick={this.handleToggleDetails}
            data-testid="expand"
          />
        </header>
        <AnimatedDetails
          pose={expand ? 'open' : 'closed'}
          style={{ overflow: 'hidden' }}
        >
          <Details>
            {task.completed ? (
              <pre className={styles.taskDescriptionCompleted}>
                {task.description || 'There are no notes.'}
              </pre>
            ) : (
              <TextArea
                className={styles.taskDescription}
                placeholder="Notes..."
                value={task.description || ''}
                onChange={this.handleChangeDescription}
                data-testid="description"
              />
            )}
            <footer className={styles.taskFooter}>
              <Tags
                className={styles.footerTags}
                tags={task.tags}
                onAddTag={this.handleAddTag}
                onRemoveTag={this.handleRemoveTag}
              />
              {this.props.onDelete && (
                <Icon
                  glyph={trashbin}
                  size={16}
                  className={styles.footerIconDangerous}
                  onClick={this.handleDelete}
                  data-testid="delete"
                />
              )}
              <Icon glyph={list} size={16} className={styles.footerIcon} />
              <Icon glyph={flag} size={16} className={styles.footerIcon} />
            </footer>
          </Details>
        </AnimatedDetails>
      </Container>
    );
  }
}

const Container = styled<{ active?: boolean; completed?: boolean }, 'div'>(
  'div',
)`
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  padding: 15px 10px;
  background-color: ${({ active }) => (active ? '#fff' : 'transparent')};
  color: ${({ completed }) => (completed ? 'lightgrey' : '#334')};
  box-shadow: ${({ active }) =>
    active ? '0 1px 3px 2px rgba(0,0,0,0.1)' : 'none'};
`;

const Title = styled(TextArea)`
  text-decoration: ${({ completed }: any) =>
    completed ? 'line-through' : 'none'};
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

export default Task;
