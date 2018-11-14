import React from 'react';
import styles from './styles.css';

function Placeholder() {
  return (
    <div className={styles.container}>
      <div className={styles.boxContainer} style={{ marginBottom: 20 }}>
        <div className={styles.box} style={{ width: 30, height: 30 }}>
          Placeholder Content
        </div>
        <div className={styles.box} style={{ width: '100%', height: 30 }}>
          Placeholder Content
        </div>
      </div>
      <Row />
      <Row />
      <Row />
    </div>
  );
}

function Row() {
  return (
    <div className={styles.boxContainer}>
      <svg width="24" height="24" viewBox="0 0 10 10">
        <circle cx="5" cy="5" r="5" />
      </svg>
      <div className={styles.box} style={{ width: '100%', height: 20 }}>
        Placeholder Content
      </div>
    </div>
  );
}

export default Placeholder;
