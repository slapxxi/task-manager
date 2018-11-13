import { Tag } from '@local/types';
import firebase from 'firebase/app';
import map from 'lodash-es/map';

async function fetchTags() {
  const snapshot = await firebase
    .database()
    .ref('/tags')
    .once('value');
  return map(snapshot.val(), (t) => t) as Tag[];
}

export default fetchTags;
