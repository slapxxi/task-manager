import firebase from 'firebase';

function updateTag(tag: Tag) {
  firebase
    .database()
    .ref(`/tags/${tag.id}`)
    .set({ name: tag.name });
}

export default updateTag;
