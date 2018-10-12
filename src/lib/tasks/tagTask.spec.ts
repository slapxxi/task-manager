import createTask from './createTask';
import tagTask from './tagTask';

it('adds tag to task', () => {
  const result = tagTask(createTask({ title: 'new' }), { name: 'new-tag' });
  expect(result.tags).toEqual([{ name: 'new-tag' }]);
});

it('throws when tag is empty', () => {
  expect(() => tagTask(createTask({ title: 'fail' }), {} as Tag)).toThrowError(
    'Tag cannot be empty',
  );
});
