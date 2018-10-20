import { Tag } from '@local/types';
import uuid from 'uuid';

interface Params extends Partial<Tag> {}

function createTag(params: Params): Tag {
  if (params.name === undefined || params.name === '') {
    throw new Error('Name required');
  }
  return {
    id: params.id || uuid.v4(),
    name: params.name,
  };
}

export default createTag;
