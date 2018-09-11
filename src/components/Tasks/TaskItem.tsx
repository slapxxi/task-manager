import * as React from 'react';
import posed from 'react-pose';
import styled from 'styled-components';
import { Icon, TextArea } from '../';
import dots from '../../assets/dots.svg';
import flag from '../../assets/flag.svg';
import list from '../../assets/list.svg';
import trashbin from '../../assets/trashbin.svg';
import { toggleTask } from '../../lib/tasks';
import styles from './styles.css';

interface Props {
  task: Task;
  onChange: (task: Task) => void;
  onDelete?: (task: Task) => void;
}

interface State {
  showDetails: boolean;
}

class TaskItem extends React.PureComponent<Props, State> {
  public state = { showDetails: false };

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

  public handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { task, onChange } = this.props;
    if (onChange) {
      onChange({ ...task, title: e.target.value });
    }
  };

  public handleToggleDetails = () => {
    this.setState({ showDetails: !this.state.showDetails });
  };

  public handleDelete = () => {
    if (this.props.onDelete) {
      const result = confirm('Sure you want to delete this task?');
      if (result) {
        this.props.onDelete(this.props.task);
      }
    }
  };

  public render() {
    const { showDetails } = this.state;
    const { task } = this.props;
    return (
      <Container
        pose={showDetails ? 'open' : 'closed'}
        active={this.state.showDetails}
        completed={task.completed}
      >
        <header className={styles.taskHeader}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={task.completed}
            onChange={this.handleToggle}
          />
          <Title
            // @ts-ignore
            completed={task.completed}
            active={this.state.showDetails}
            className={styles.taskTitle}
            type="text"
            value={task.title || ''}
            placeholder="Title..."
            onChange={this.handleChangeTitle}
          />
          {this.state.showDetails ? null : <Tags />}
          <Icon
            glyph={dots}
            width={15}
            style={{ marginLeft: 10 }}
            className={styles.detailsIcon}
            onClick={this.handleToggleDetails}
          />
        </header>
        <Details active={this.state.showDetails} className={styles.taskDetails}>
          {task.completed ? (
            <pre className={styles.taskDescriptionCompleted}>
              {task.description}
            </pre>
          ) : (
            <TextArea
              className={styles.taskDescription}
              placeholder="Notes..."
              value={task.description || ''}
              onChange={this.handleChangeDescription}
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
              />
            )}
            <Icon glyph={list} size={16} className={styles.footerIcon} />
            <Icon glyph={flag} size={16} className={styles.footerIcon} />
          </footer>
        </Details>
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

const AnimatedContainer = posed.li({
  open: {},
  closed: {},
});

const Container = styled(AnimatedContainer)`
  position: relative;
  margin-bottom: ${({ active }) => (active ? '10px' : 0)};
  background-color: ${({ active }) => (active ? '#fff' : 'transparent')};
  border: 1px solid transparent;
  padding: 0 15px;
  border-color: ${({ active }) => (active ? '#f3fafa' : 'transparent')};
  color: ${({ completed }) => (completed ? 'lightgrey' : '#334')};
  box-shadow: ${({ active }) =>
    active ? '0 1px 3px 2px rgba(0,0,0,0.1)' : 'none'};
`;

const Title = styled.input`
  text-decoration: ${({ completed }: any) =>
    completed ? 'line-through' : 'none'};
  color: ${({ active }: any) => (active ? '#112' : '#445')};
  color: ${({ completed }: any) => (completed ? '#b3b3bb' : null)};
`;

const AnimatedDetails = posed.div({
  open: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 200,
    },
  },
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 200,
    },
  },
});

const Details = styled(AnimatedDetails)`
  box-sizing: border-box;
  padding: 5px 0;
  overflow: hidden;
`;

export default TaskItem;
