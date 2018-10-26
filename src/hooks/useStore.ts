import { useContext } from 'react';
import StoreContext from '../components/Store/context';

function useStore() {
  return useContext(StoreContext);
}

export default useStore;
