import createProject from './createProject';

it('creates a project', () => {
  const result = createProject({ name: 'New Project' });
  expect(result).toEqual({ id: 'unique-id-0', name: 'New Project' });
});
