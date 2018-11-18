import IconSystem from '@local/components/IconSystem/IconSystem';
import React from 'react';
import styles from './styles.css';

function LogbookPage() {
  return (
    <div className={styles.logbookPage}>
      <header className={styles.header}>
        <IconSystem name="book" size={30} />
        <h1 className={styles.title}>Logbook</h1>
      </header>
    </div>
  );
}

export default LogbookPage;
