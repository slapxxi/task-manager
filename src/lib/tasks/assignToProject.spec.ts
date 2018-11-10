import { Project, Task } from '@local/types';
import assignToProject from './assignToProject';

it('assigns task to project', () => {
  const result = assignToProject({} as Task, { id: 'test-project' } as Project);
  expect(result.project).toEqual('test-project');
});

it('throws when ID missing in project', () => {
  expect(() => assignToProject({} as Task, {} as Project)).toThrow('Missing project ID');
});
