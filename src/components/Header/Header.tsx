import Button from '@local/components/Button/Button';
import IconSystem from '@local/components/IconSystem/IconSystem';
import Search from '@local/components/Search/Search';
import useStore from '@local/hooks/useStore';
import React from 'react';
import styles from './styles.css';

function Header() {
  const { state } = useStore();

  return (
    <header className={styles.container}>
      <Search className={styles.search} />
      {state.isSyncing && (
        <Button className={styles.syncIcon}>
          <IconSystem name="cloud" width={22} />
        </Button>
      )}
      <Button>
        <IconSystem name="bell" size={20} />
      </Button>
    </header>
  );
}

export default Header;
