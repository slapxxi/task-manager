import { createTag } from '@lib';
import { DBTag } from '@local/types';
import firebase from 'firebase';

interface Params {
  name: string;
}

function createDBTag(params: Params) {
  const tag = createTag(params);
  firebase
    .database()
    .ref(`/tags/${tag.id}`)
    .set({ name: tag.name } as DBTag);
  return tag.id;
}

export default createDBTag;
