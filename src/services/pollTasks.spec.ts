import pollTasks from './pollTasks';

Date.now = jest.fn(() => 69696969);

it('polls all available tasks', (done) => {
  pollTasks((tasks) => {
    expect(tasks).toMatchSnapshot();
    done();
  });
});

it('sorts by `createdAt` field', (done) => {
  pollTasks((tasks) => {
    expect(tasks[0].createdAt).toEqual(1);
    expect(tasks[1].createdAt).toEqual(2);
    done();
  });
});
