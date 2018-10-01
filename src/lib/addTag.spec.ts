import addTag from './addTag';

jest.mock('uuid', () => ({ v4: () => 'ID' }));

const task: Task = {
  id: 'id',
  title: 'title',
  description: '',
  tags: [],
  completed: false,
  createdAt: 1,
};

it('does not add tag if there is tag with same ID', () => {
  const result = addTag(
    { ...task, tags: [{ id: 'html', name: 'HTML' }] },
    { id: 'html', name: 'new' },
  );
  expect(result.tags).toEqual([{ id: 'html', name: 'HTML' }]);
});

it('does not add tag if there is tag with similar name', () => {
  const result = addTag(
    { ...task, tags: [{ id: 'html', name: 'HTML' }] },
    { name: 'html' },
  );
  expect(result.tags).toEqual([{ id: 'html', name: 'HTML' }]);
});

it('generates ID for a tag if missing', () => {
  const result = addTag(task, { name: 'new' });
  expect(result.tags).toEqual([{ id: 'ID', name: 'new' }]);
});

it('does not change any of original values', () => {
  const result = addTag(task, { name: 'new' });
  expect(result).not.toEqual(task);
});
