import firebase from 'firebase';
import pollDatabase from './pollTasks';

beforeEach(() => {
  // @ts-ignore
  firebase.__reset();
});

it('polls all available tasks', (done) => {
  pollDatabase(({ tasks }) => {
    expect(tasks).toMatchSnapshot();
    done();
  });
});

it('contains tags', (done) => {
  pollDatabase(({ tasks }) => {
    expect(tasks[0].tags).toEqual([]);
    expect(tasks[2].tags).toEqual([{ id: 'html', name: 'HTML' }]);
    done();
  });
});

it('sorts by `createdAt` field', (done) => {
  pollDatabase(({ tasks }) => {
    expect(tasks[0].createdAt).toEqual(1);
    expect(tasks[1].createdAt).toEqual(2);
    done();
  });
});
