import IconSystem from '@local/components/IconSystem/IconSystem';
import React from 'react';
import styles from './styles.css';

function SettingsPage() {
  return (
    <div className={styles.settingsPage}>
      <header className={styles.header}>
        <IconSystem name="settings" size={30} />
        <PageTitle className={styles.title}>Settings</PageTitle>
      </header>
    </div>
  );
}

function PageTitle({
  children,
  ...rest
}: {
  children: React.ReactNode;
  [prop: string]: any;
}) {
  return <h1 {...rest}>{children}</h1>;
}

export default SettingsPage;
