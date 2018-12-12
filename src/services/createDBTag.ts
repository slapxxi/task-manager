import { createTag } from '@lib';
import { StoreTag } from '@local/types';
import firebase from 'firebase/app';

interface Params {
  name: string;
}

function createDBTag(params: Params) {
  const tag = createTag(params);
  firebase
    .database()
    .ref(`/tags/${tag.id}`)
    .set({ name: tag.name } as StoreTag);
  return tag.id;
}

export default createDBTag;
