import toggleTask from './toggleTask';

it('completes a task if not completed', () => {
  const task = toggleTask({ completed: false } as Task);
  expect(task.completed).toEqual(true);
});

it('unchecks a task if completed', () => {
  const task = toggleTask({ completed: true } as Task);
  expect(task.completed).toEqual(false);
});
