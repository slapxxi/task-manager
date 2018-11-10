import { useStore } from '@local/hooks';
import React, { ReactElement, ReactNode } from 'react';
import { render } from 'react-testing-library';
import { updateProject, updateTask } from '../../services';
import StoreProvider from './StoreProvider';

const mockDatabase = {
  tasks: [{ id: 'task', title: 'Task' }],
  tags: [{ id: 'css', name: 'CSS' }],
  projects: [{ id: 'project', name: 'Project' }],
};

jest.mock('../../services/pollDatabase', () => (fn: any) => fn(mockDatabase));
jest.mock('../../services/updateTask', () => jest.fn());
jest.mock('../../services/updateProject', () => jest.fn());

function Subject({ children }: { children: (store: any) => ReactNode }) {
  const store = useStore();
  return <div>{children(store)}</div>;
}

it('provides tags', () => {
  const spy = jest.fn(() => 'div');
  const tree = (
    <StoreProvider>
      <Subject>{({ tags }) => spy(tags)}</Subject>
    </StoreProvider>
  );
  renderEffect(tree);
  expect(spy).toHaveBeenCalledWith(mockDatabase.tags);
});

it('provides projects', () => {
  const spy = jest.fn(() => 'div');
  const tree = (
    <StoreProvider>
      <Subject>{({ projects }) => spy(projects)}</Subject>
    </StoreProvider>
  );
  renderEffect(tree);
  expect(spy).toHaveBeenCalledWith(mockDatabase.projects);
});

it('provides tasks', () => {
  const spy = jest.fn(() => 'div');
  const tree = (
    <StoreProvider>
      <Subject>{({ tasks }) => spy(tasks)}</Subject>
    </StoreProvider>
  );
  renderEffect(tree);
  expect(spy).toHaveBeenCalledWith(mockDatabase.tasks);
});

it('provides action for updating tasks', () => {
  const tree = (
    <StoreProvider>
      <Subject>
        {({ tasks, actions }) => <div>{actions.updateTask(tasks[0])}</div>}
      </Subject>
    </StoreProvider>
  );
  renderEffect(tree);
  expect(updateTask).toHaveBeenCalledWith(mockDatabase.tasks[0], mockDatabase.tags);
});

it('provides action for updating projects', () => {
  const tree = (
    <StoreProvider>
      <Subject>
        {({ projects, actions }) => <div>{actions.updateProject(projects[0])}</div>}
      </Subject>
    </StoreProvider>
  );
  renderEffect(tree);
  expect(updateProject).toHaveBeenCalledWith(mockDatabase.projects[0]);
});

function renderEffect(tree: ReactElement<any>) {
  const { rerender, container } = render(tree);
  rerender(tree);
  return container;
}
