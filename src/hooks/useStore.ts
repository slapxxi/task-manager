import StoreContext from '@local/components/Store/context';
import { useContext } from 'react';

function useStore() {
  return useContext(StoreContext);
}

export default useStore;
