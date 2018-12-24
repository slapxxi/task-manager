import IconSystem from '@local/components/IconSystem/IconSystem';
import React from 'react';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import styles from './styles.css';

function SettingsPage() {
  return (
    <div className={styles.settingsPage}>
      <div className={styles.toolbar}>
        <Breadcrumbs />
      </div>
      <header className={styles.header}>
        <IconSystem name="cog" size={30} />
        <h1 className={styles.title}>Settings</h1>
      </header>
    </div>
  );
}

export default SettingsPage;
