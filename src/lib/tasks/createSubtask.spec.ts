import createSubtask from './createSubtask';

it('creates subtask with default params', () => {
  const result = createSubtask({});
  expect(result).toEqual({
    id: 'unique-id-0',
    completed: false,
    description: '',
  });
});

it('accepts params', () => {
  const result = createSubtask({
    id: 'id',
    completed: true,
    description: 'desc',
  });
  expect(result).toEqual({
    id: 'id',
    completed: true,
    description: 'desc',
  });
});
