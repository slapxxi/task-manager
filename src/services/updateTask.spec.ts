import { createTag, createTask } from '@lib';
import firebase from 'firebase/app';
import uuid from 'uuid';
import updateTask from './updateTask';

const tags = [
  createTag({ id: 'html', name: 'HTML' }),
  createTag({ id: 'css', name: 'CSS' }),
];

beforeEach(async () => {
  // @ts-ignore
  firebase.__reset();
  // @ts-ignore
  uuid.__reset();
});

it('updates task', async () => {
  updateTask(createTask({ title: 'task' }), tags);
  const result = await firebase
    .database()
    .ref('/tasks')
    .once('value');
  expect(result.val()).toMatchSnapshot();
});

it('reuses existing tags', async () => {
  updateTask(
    createTask({
      title: 'task',
      tags: [{ name: 'css' }, { name: 'html' }, { name: 'ruby' }],
    }),
    tags,
  );
  const result = await firebase
    .database()
    .ref('/tasks')
    .once('value');
  expect(result.val()).toMatchSnapshot();
});
