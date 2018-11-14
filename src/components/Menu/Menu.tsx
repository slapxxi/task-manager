import arrowDown from '@local/assets/arrow_down.svg';
import book from '@local/assets/book.svg';
import box from '@local/assets/box.svg';
import briefcase from '@local/assets/briefcase.svg';
import cross from '@local/assets/cross.svg';
import inbox from '@local/assets/inbox.svg';
import settings from '@local/assets/settings.svg';
import star from '@local/assets/star.svg';
import tag from '@local/assets/tag.svg';
import trash from '@local/assets/trash.svg';
import CalendarIcon from '@local/components/CalendarIcon/CalendarIcon';
import Icon from '@local/components/Icon/Icon';
import { Location } from 'history';
import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
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
              <Icon glyph={star} size={iconSize} className={styles.icon} />
              <Link to="/today" className={styles.link}>
                Today
              </Link>
            </li>
            <li className={styles.listItem}>
              <Icon glyph={box} size={iconSize} className={styles.icon} />
              <Link to="/someday" className={styles.link}>
                Someday
              </Link>
            </li>
            <li className={styles.listItem}>
              <CalendarIcon date={new Date()} size={iconSize} className={styles.icon} />
              <Link to="/upcoming" className={styles.link}>
                Upcoming
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
              <Icon glyph={book} size={iconSize} className={styles.icon} />
              <Link to="/logbook" className={styles.link}>
                Logbook
              </Link>
            </li>
            <li className={styles.listItem}>
              <Icon glyph={trash} size={iconSize} className={styles.icon} />
              <Link to="/trash" className={styles.link}>
                Trash
              </Link>
            </li>
            <li className={styles.listItem}>
              <Icon glyph={settings} size={iconSize} className={styles.icon} />
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
