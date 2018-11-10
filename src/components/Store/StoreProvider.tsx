import { InnerStore, Project, Tag, Task } from '@local/types';
import React, { useEffect, useState } from 'react';
import {
  deleteTask,
  pollDatabase,
  stopPolling,
  updateProject,
  updateTask,
} from '../../services';
import { Provider } from './context';

interface Props {
  store?: InnerStore;
  children: React.ReactNode;
}

interface State {
  tasks: Task[];
  tags: Tag[];
  projects: Project[];
  isLoading: boolean;
}

function StoreProvider({ children }: Props) {
  const [state, setState] = useState<State>({
    tasks: [],
    tags: [],
    projects: [],
    isLoading: true,
  });

  const value = {
    ...state,
    actions: {
      updateTask: (task: Task) => {
        updateTask(task, state.tags);
      },
      updateProject: (project: Project) => {
        updateProject(project);
      },
      deleteTask: (task: Task) => {
        deleteTask(task);
      },
    },
  };

  useEffect(() => {
    const fn = pollDatabase((database) => setState({ ...database, isLoading: false }));
    return () => stopPolling(fn);
  }, []);

  return <Provider value={value}>{children}</Provider>;
}

export default StoreProvider;
