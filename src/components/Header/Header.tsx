import Button from '@local/components/Button/Button';
import IconSystem from '@local/components/IconSystem/IconSystem';
import Search from '@local/components/Search/Search';
import React from 'react';
import styles from './styles.css';

function Header() {
  return (
    <header className={styles.container}>
      <Search className={styles.search} />
      <Button>
        <IconSystem name="bell" size={20} />
      </Button>
    </header>
  );
}

export default Header;
