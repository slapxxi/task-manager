import uuid from 'uuid';

interface Params extends Tag {
  id?: string;
  name: string;
}

function addTag(task: Task, params: Params) {
  if (
    task.tags.filter(
      (t) =>
        t.name.toLowerCase() === params.name.toLowerCase() ||
        t.id === params.id,
    ).length > 0
  ) {
    return task;
  }
  const id = params.id || uuid.v4();
  return {
    ...task,
    tags: [...task.tags, { id, name: params.name }],
  };
}

export default addTag;
