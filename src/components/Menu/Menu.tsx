import CalendarIcon from '@local/components/CalendarIcon/CalendarIcon';
import IconSystem from '@local/components/IconSystem/IconSystem';
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
          <IconSystem name="arrow-down" size={20} />
        </button>
      </header>
      <div className={active ? styles.layoutActive : styles.layout}>
        <button className={styles.buttonRight} onClick={handleClick}>
          <IconSystem name="cross" size={18} />
        </button>
        <nav>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <IconSystem name="inbox" size={iconSize} className={styles.icon} />
              <Link to="/" className={styles.link}>
                Inbox
              </Link>
            </li>
            <li className={styles.listItem}>
              <IconSystem name="star" size={iconSize} className={styles.icon} />
              <Link to="/today" className={styles.link}>
                Today
              </Link>
            </li>
            <li className={styles.listItem}>
              <IconSystem name="box" size={iconSize} className={styles.icon} />
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
              <IconSystem name="tag" size={iconSize} className={styles.tagIcon} />
              <Link to="/tags" className={styles.link}>
                Tags
              </Link>
            </li>
            <li className={styles.listItem}>
              <IconSystem name="briefcase" size={iconSize} className={styles.icon} />
              <Link to="/projects" className={styles.link}>
                Projects
              </Link>
            </li>
            <li className={styles.listItem}>
              <IconSystem name="book" size={iconSize} className={styles.icon} />
              <Link to="/logbook" className={styles.link}>
                Logbook
              </Link>
            </li>
            <li className={styles.listItem}>
              <IconSystem name="trash" size={iconSize} className={styles.icon} />
              <Link to="/trash" className={styles.link}>
                Trash
              </Link>
            </li>
            <li className={styles.listItem}>
              <IconSystem name="settings" size={iconSize} className={styles.icon} />
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
