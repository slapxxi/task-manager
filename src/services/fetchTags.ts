import firebase from 'firebase';
import { map } from 'lodash';

async function fetchTags() {
  const snapshot = await firebase
    .database()
    .ref('/tags')
    .once('value');
  return map(snapshot.val(), (t) => t) as Tag[];
}

export default fetchTags;
