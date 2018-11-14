import trash from '@local/assets/trash.svg';
import { Icon } from '@local/components';
import React from 'react';
import styles from './styles.css';

function TrashPage() {
  return (
    <div className={styles.trashPage}>
      <header className={styles.header}>
        <Icon glyph={trash} size={30} />
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
