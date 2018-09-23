import uuid from 'uuid';

interface Params {
  id?: Task['id'];
  name: Tag['name'];
}

function createTag(params: Params): Tag {
  const id = uuid.v4();
  return {
    id: params.id || id,
    name: params.name,
  };
}

export default createTag;
