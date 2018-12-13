import IconSystem from '@local/components/IconSystem/IconSystem';
import React from 'react';
import { NavLink, Route, RouteComponentProps } from 'react-router-dom';
import styles from './styles.css';

function Breadcrumbs() {
  return (
    <ul className={styles.container}>
      <li className={styles.item}>
        <NavLink to="/" className={styles.link} exact>
          Home
        </NavLink>
      </li>
      <Route path="/:path" component={BreadcrumbsItem} />
    </ul>
  );
}

function BreadcrumbsItem({ match }: RouteComponentProps<{ path: string }>) {
  return (
    <>
      <li className={styles.item}>
        <IconSystem name="arrow-right" size={10} className={styles.icon} />
        <NavLink to={match.url} className={styles.link} exact>
          {match.params.path}
        </NavLink>
      </li>
      <Route path={`${match.url}/:path`} component={BreadcrumbsItem} />
    </>
  );
}

export default Breadcrumbs;
