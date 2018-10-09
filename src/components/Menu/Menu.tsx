import * as React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Icon } from '..';
import arrowDown from '../../assets/arrow_down.svg';
import briefcase from '../../assets/briefcase.svg';
import cross from '../../assets/cross.svg';
import inbox from '../../assets/inbox.svg';
import tag from '../../assets/tag.svg';
import styles from './styles.css';

interface State {
  active: boolean;
}

class Menu extends React.Component<RouteComponentProps, State> {
  public state = { active: false };

  public componentDidUpdate(prevProps: RouteComponentProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ active: false });
    }
  }

  public handleClick = () => {
    this.setState({ active: !this.state.active });
  };

  public render() {
    const iconSize = 22;
    return (
      <div className={styles.menu}>
        <header className={styles.header}>
          <button className={styles.button} onClick={this.handleClick}>
            <Icon glyph={arrowDown} size={20} />
          </button>
        </header>
        <div
          className={this.state.active ? styles.layoutActive : styles.layout}
        >
          <button className={styles.buttonRight} onClick={this.handleClick}>
            <Icon glyph={cross} size={18} />
          </button>
          <nav>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <Icon glyph={inbox} size={iconSize} className={styles.icon} />
                <Link to="/" className={styles.link}>
                  Inbox
                </Link>
              </li>
              <li className={styles.listItem}>
                <Icon glyph={tag} size={iconSize} className={styles.tagIcon} />
                <Link to="/" className={styles.link}>
                  Tags
                </Link>
              </li>
              <li className={styles.listItem}>
                <Icon
                  glyph={briefcase}
                  size={iconSize}
                  className={styles.icon}
                />
                <Link to="/projects" className={styles.link}>
                  Projects
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default withRouter(Menu);
