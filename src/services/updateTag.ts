import firebase from 'firebase';
import uuid from 'uuid';

function updateTag(tag: Tag) {
  const id = tag.id || uuid.v4();
  firebase
    .database()
    .ref(`/tags/${id}`)
    .set(createTag(tag));
  return id;
}

function createTag(params: any) {
  return {
    name: params.name,
  };
}

export default updateTag;
