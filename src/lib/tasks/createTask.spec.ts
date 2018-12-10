import { Regex } from '@lib';
import createTask from './createTask';

jest.unmock('uuid');

it('generates ID', () => {
  const task = createTask({ id: undefined });
  expect(task.id).toMatch(Regex.ID);
});

it('provides empty values', () => {
  const task = createTask({ title: undefined, description: undefined });
  expect(task).toMatchObject({ title: '', description: '' });
});

it('creates subtasks field', () => {
  const task = createTask({ subtasks: undefined });
  expect(task.subtasks).toEqual([]);
});

it('generates creation date', () => {
  const task = createTask({ createdAt: undefined });
  expect(task.createdAt).toEqual(new Date());
});
