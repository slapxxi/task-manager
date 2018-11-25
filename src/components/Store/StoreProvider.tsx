import deleteProject from '@local/services/deleteProject';
import { InnerStore, Project, StoreState, Task } from '@local/types';
import React, { useEffect, useMemo, useState } from 'react';
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

function StoreProvider({ children }: Props) {
  const store = useStore();
  return <Provider value={store}>{children}</Provider>;
}

function useStore() {
  const db = useDatabase();
  const store = useMemo<InnerStore>(
    () => ({
      tasks: db.tasks,
      tags: db.tags,
      projects: db.projects,
      isLoading: false,
      actions: {
        updateProject: (project: Project) => updateProject(project),
        updateTask: (task: Task) => updateTask(task, db.tags),
        deleteTask: (task: Task) => deleteTask(task),
        deleteProject: (project: Project) => deleteProject(project),
      },
    }),
    [db],
  );
  return store;
}

function useDatabase() {
  const [database, setDatabase] = useState<StoreState>({
    tags: [],
    projects: [],
    tasks: [],
  });

  useEffect(() => {
    const fn = pollDatabase((db) => {
      setDatabase(db);
    });
    return () => stopPolling(fn);
  }, []);

  return database;
}

export default StoreProvider;
