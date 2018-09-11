function isValidTask(task: Task) {
  if (
    task.title === undefined ||
    task.title === null ||
    task.title.trim() === ''
  ) {
    return false;
  }
  return true;
}

export default isValidTask;
