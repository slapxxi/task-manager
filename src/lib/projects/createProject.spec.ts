import { Task } from '@local/types';
import createProject from './createProject';

it('creates a project', () => {
  const result = createProject({ name: 'New Project' });
  expect(result).toEqual({ id: 'unique-id-0', name: 'New Project', tasks: [] });
});

it('accepts params', () => {
  const result = createProject({
    id: 'id',
    name: 'New Project',
    tasks: [{} as Task],
  });
  expect(result).toEqual({ id: 'id', name: 'New Project', tasks: [{}] });
});

it('throws if name is not specified', () => {
  expect(() => createProject({} as any)).toThrow();
});
