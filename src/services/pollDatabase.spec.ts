import firebase from 'firebase';
import pollDatabase from './pollDatabase';

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

it('extracts projects', (done) => {
  pollDatabase(({ projects }) => {
    expect(projects).toEqual([
      {
        id: 'test',
        name: 'Test Project',
        tasks: [expect.objectContaining({ id: 'third-task' })],
      },
    ]);
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
