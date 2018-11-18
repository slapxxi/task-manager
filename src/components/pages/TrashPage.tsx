import IconSystem from '@local/components/IconSystem/IconSystem';
import React from 'react';
import styles from './styles.css';

function TrashPage() {
  return (
    <div className={styles.trashPage}>
      <header className={styles.header}>
        <IconSystem name="trash" size={30} />
        <PageTitle className={styles.title}>Trash</PageTitle>
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

export default TrashPage;
