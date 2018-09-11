import { map, sortBy } from 'lodash';
import { createTask } from '../lib/tasks';

function mapResponseToData(response: APIResponse['tasks']): Task[] {
  return sortBy(
    map(response, (t, key) => createTask({ ...t, id: key })),
    'createdAt',
  );
}

export default mapResponseToData;
