import createTask from './createTask';

jest.unmock('uuid');

const ID_REGEX = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

it('generates ID', () => {
  const task = createTask();
  expect(task.id).toMatch(ID_REGEX);
});

it('provides empty values', () => {
  const task = createTask();
  expect(task).toMatchObject({ title: '', description: '' });
});
