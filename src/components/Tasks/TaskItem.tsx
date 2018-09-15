import * as React from 'react';
import posed from 'react-pose';
import styled from 'styled-components';
import { Icon } from '../';
import dots from '../../assets/dots.svg';
import flag from '../../assets/flag.svg';
import list from '../../assets/list.svg';
import trashbin from '../../assets/trashbin.svg';
import { toggleTask } from '../../lib/tasks';
import TextArea from '../TextArea/TextArea';
import styles from './styles.css';

interface Props {
  task: Task;
  expand?: boolean;
  confirmDelete?: boolean;
  onChange?: (task: Task) => void;
  onDelete?: (task: Task) => void;
  onExpand?: (expand: boolean) => void;
}

class TaskItem extends React.PureComponent<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.state = { showDetails: this.props.expand ? true : false };
  }

  public handleToggle = () => {
    const { task, onChange } = this.props;
    if (onChange) {
      onChange(toggleTask(task));
    }
  };

  public handleChangeDescription = (value: string) => {
    const { task, onChange } = this.props;
    if (onChange) {
      onChange({ ...task, description: value });
    }
  };

  public handleChangeTitle = (title: string) => {
    const { task, onChange } = this.props;
    if (onChange) {
      onChange({ ...task, title });
    }
  };

  public handleToggleDetails = () => {
    if (this.props.onExpand) {
      this.props.onExpand(!this.props.expand);
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
      // @ts-ignore
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
            // @ts-ignore
            completed={task.completed}
            active={expand}
            className={styles.taskTitle}
            type="text"
            value={task.title || ''}
            placeholder="Title..."
            onChange={this.handleChangeTitle}
            data-testid="title"
          />
          {expand ? null : <Tags />}
          <Icon
            glyph={dots}
            width={15}
            style={{ marginLeft: 10 }}
            className={styles.detailsIcon}
            onClick={this.handleToggleDetails}
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
              <Tags className={styles.footerTags} />
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

function Tags(props: any) {
  return (
    <ul className={styles.tags} {...props}>
      <li className={styles.tag}>html</li>
      <li className={styles.tag}>css</li>
    </ul>
  );
}

const Container = styled<{ active: boolean; completed: boolean }, 'li'>('li')`
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

export default TaskItem;
