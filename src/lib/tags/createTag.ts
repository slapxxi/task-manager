import uuid from 'uuid';

interface Params {
  id?: Task['id'];
  name: Tag['name'];
}

function createTag(params?: Params): Tag {
  const id = uuid.v4();
  if (params) {
    return {
      id: params.id || id,
      name: params.name,
    };
  }
  return { id, name: '' };
}

export default createTag;
