import toggleTask from './toggleTask';

it('completes a task if not completed', () => {
  const task = toggleTask({ completed: false });
  expect(task.completed).toEqual(true);
});

it('unchecks a task if completed', () => {
  const task = toggleTask({ completed: true });
  expect(task.completed).toEqual(false);
});
