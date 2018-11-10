import { Location } from 'history';
import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import arrowDown from '../../assets/arrow_down.svg';
import briefcase from '../../assets/briefcase.svg';
import cross from '../../assets/cross.svg';
import inbox from '../../assets/inbox.svg';
import tag from '../../assets/tag.svg';
import Icon from '../Icon/Icon';
import styles from './styles.css';

interface Props {
  location: Location;
}

function Menu({ location }: Props) {
  const [active, setActive] = useState(false);
  const iconSize = 22;

  useEffect(
    () => {
      setActive(false);
    },
    [location.pathname],
  );

  function handleClick() {
    setActive(!active);
  }

  return (
    <div className={styles.menu}>
      <header className={styles.header}>
        <button className={styles.button} onClick={handleClick}>
          <Icon glyph={arrowDown} size={20} />
        </button>
      </header>
      <div className={active ? styles.layoutActive : styles.layout}>
        <button className={styles.buttonRight} onClick={handleClick}>
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
              <Link to="/tags" className={styles.link}>
                Tags
              </Link>
            </li>
            <li className={styles.listItem}>
              <Icon glyph={briefcase} size={iconSize} className={styles.icon} />
              <Link to="/projects" className={styles.link}>
                Projects
              </Link>
            </li>
            <li className={styles.listItem}>
              <Icon glyph={briefcase} size={iconSize} className={styles.icon} />
              <Link to="/settings" className={styles.link}>
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default withRouter(Menu);
