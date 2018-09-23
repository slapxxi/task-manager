import * as React from 'react';
import { Icon } from '..';
import cross from '../../assets/cross.svg';
import hamburger from '../../assets/hamburger.svg';
import tag from '../../assets/tag.svg';
import styles from './styles.css';

interface State {
  active: boolean;
}

class Menu extends React.Component<{}, State> {
  public state = { active: false };

  public handleClick = () => {
    this.setState({ active: !this.state.active });
  };

  public render() {
    return (
      <div className={styles.menu}>
        <header className={styles.header}>
          <button className={styles.button} onClick={this.handleClick}>
            <Icon glyph={hamburger} size={16} />
          </button>
        </header>
        <div
          className={this.state.active ? styles.layoutActive : styles.layout}
        >
          <button className={styles.button} onClick={this.handleClick}>
            <Icon glyph={cross} size={18} />
          </button>
          <nav>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <Icon glyph={tag} size={24} className={styles.icon} />
                Inbox
              </li>
              <li className={styles.listItem}>
                <Icon glyph={tag} size={24} className={styles.icon} />
                Tags
              </li>
              <li className={styles.listItem}>
                <Icon glyph={tag} size={24} className={styles.icon} />
                Projects
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default Menu;
