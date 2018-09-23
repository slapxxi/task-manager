import firebase from 'firebase';
import { first } from 'lodash';
import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import uuid from 'uuid';
import Store from './Store';
import StoreProvider from './StoreProvider';

const captureTasksSpy = jest.fn(() => 'div');
const captureTagsSpy = jest.fn(() => 'div');

beforeEach(() => {
  // @ts-ignore
  uuid.__reset();
  // @ts-ignore
  firebase.__reset();
  captureTasksSpy.mockClear();
  captureTagsSpy.mockClear();
});

it('provides access to tasks', () => {
  render(<Example captureTasks={captureTasksSpy} />);
  expect(captureTasksSpy).toHaveBeenLastCalledWith(
    expect.arrayContaining([
      {
        id: 'first-task',
        title: 'first',
        tags: [],
        createdAt: 1,
        description: '',
        completed: false,
      },
    ]),
  );
});

it('provides access to tags', () => {
  render(<Example captureTags={captureTagsSpy} />);
  expect(captureTagsSpy).toHaveBeenLastCalledWith([
    { id: 'html', name: 'HTML' },
    { id: 'css', name: 'CSS' },
  ]);
});

it('allows to update tasks', (done) => {
  const { getByText } = render(
    <Example
      captureTasks={captureTasksSpy}
      update={({ tasks, updateTask }) =>
        updateTask({ ...first(tasks), title: 'updated' })
      }
    />,
  );
  fireEvent.click(getByText('Update'));
  waitUntilDatabaseUpdates(() => {
    expect(captureTasksSpy).toHaveBeenLastCalledWith(
      expect.arrayContaining([
        {
          id: 'first-task',
          title: 'updated',
          completed: false,
          createdAt: 1,
          description: '',
          tags: [],
        },
      ]),
    );
    done();
  });
});

it('allows to create new tasks', (done) => {
  const { getByText } = render(
    <Example
      captureTasks={captureTasksSpy}
      update={({ updateTask }) => updateTask({ title: 'new' })}
    />,
  );
  fireEvent.click(getByText('Update'));
  waitUntilDatabaseUpdates(() => {
    expect(captureTasksSpy).toHaveBeenLastCalledWith(
      expect.arrayContaining([
        {
          id: 'unique-id-0',
          title: 'new',
          tags: [],
          description: '',
          createdAt: 69,
          completed: false,
        },
      ]),
    );
    done();
  });
});

it('allows to create new tags', (done) => {
  const { getByText } = render(
    <Example
      captureTags={captureTagsSpy}
      captureTasks={captureTasksSpy}
      update={({ updateTask }) =>
        updateTask({ id: 'firstTask', tags: [{ name: 'new' }] })
      }
    />,
  );
  fireEvent.click(getByText('Update'));
  waitUntilDatabaseUpdates(() => {
    expect(captureTagsSpy).toHaveBeenLastCalledWith([
      { id: 'html', name: 'HTML' },
      { id: 'css', name: 'CSS' },
      { id: 'unique-id-0', name: 'new' },
    ]);
    done();
  });
});

it('will not create duplicate tags', (done) => {
  const { getByText } = render(
    <Example
      captureTags={captureTagsSpy}
      update={({ updateTask }) =>
        updateTask({ id: 'firstTask', tags: [{ name: 'css' }] })
      }
    />,
  );
  fireEvent.click(getByText('Update'));
  waitUntilDatabaseUpdates(() => {
    expect(captureTagsSpy).toHaveBeenLastCalledWith([
      { id: 'html', name: 'HTML' },
      { id: 'css', name: 'CSS' },
    ]);
    done();
  });
});

it('will substitute id with one matching from DB', (done) => {
  const { getByText } = render(
    <Example
      captureTags={captureTagsSpy}
      captureTasks={captureTasksSpy}
      update={({ tasks, updateTask }) =>
        updateTask({
          ...first(tasks),
          tags: [{ id: 'css' }],
        })
      }
    />,
  );
  fireEvent.click(getByText('Update'));
  waitUntilDatabaseUpdates(() => {
    expect(captureTasksSpy).toHaveBeenLastCalledWith(
      expect.arrayContaining([
        {
          id: 'first-task',
          title: 'first',
          tags: [{ id: 'css', name: 'CSS' }],
          description: '',
          createdAt: 1,
          completed: false,
        },
      ]),
    );
    done();
  });
});

it('will replace id for new tags', (done) => {
  const { getByText } = render(
    <Example
      captureTags={captureTagsSpy}
      captureTasks={captureTasksSpy}
      update={({ tasks, updateTask }) =>
        updateTask({
          ...first(tasks),
          tags: [{ id: 'non-existent', name: 'dummy' }],
        })
      }
    />,
  );
  fireEvent.click(getByText('Update'));
  waitUntilDatabaseUpdates(() => {
    expect(captureTagsSpy).toHaveBeenLastCalledWith(
      expect.arrayContaining([
        {
          id: 'unique-id-0',
          name: 'dummy',
        },
      ]),
    );
    done();
  });
});

function Example({
  captureTasks,
  captureTags,
  update,
}: {
  captureTasks?: (params: any) => void;
  captureTags?: (params: any) => void;
  update?: (params: any) => void;
}) {
  return (
    <StoreProvider>
      <Store>
        {(store) => (
          <div>
            {captureTags && captureTags(store.tags)}
            {captureTasks && captureTasks(store.tasks)}
            {update && <button onClick={() => update(store)}>Update</button>}
          </div>
        )}
      </Store>
    </StoreProvider>
  );
}

function waitUntilDatabaseUpdates(fn) {
  setTimeout(fn, 10);
}
