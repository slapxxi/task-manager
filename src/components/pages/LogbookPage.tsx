import book from '@local/assets/book.svg';
import Icon from '@local/components/Icon/Icon';
import React from 'react';
import styles from './styles.css';

function LogbookPage() {
  return (
    <div className={styles.logbookPage}>
      <header className={styles.header}>
        <Icon glyph={book} size={30} />
        <PageTitle className={styles.title}>Logbook</PageTitle>
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

export default LogbookPage;
