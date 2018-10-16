import { Tag } from '@local/types';
import createTag from './createTag';

it('creates a tag', () => {
  const result = createTag({ name: 'tag' });
  expect(result).toEqual({ id: 'unique-id-0', name: 'tag' });
});

it('throws if name is not specified', () => {
  expect(() => createTag({} as Tag)).toThrow();
});
