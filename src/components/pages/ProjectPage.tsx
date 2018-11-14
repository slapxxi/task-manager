import { assignToProject } from '@lib';
import { Project, TasksEditor } from '@local/components';
import { useStore } from '@local/hooks';
import { ID } from '@local/types';
import React from 'react';

interface Props {
  projectID: ID;
}

function ProjectPage({ projectID }: Props) {
  const { projects, actions } = useStore();
  const project = projects.filter((p) => p.id === projectID)[0];

  if (project === undefined) {
    return null;
  }

  return (
    <div>
      <Project project={project} onEdit={actions.updateProject}>
        <TasksEditor
          tasks={project.tasks}
          onCreate={(t) => actions.updateTask(assignToProject(t, project))}
          onEdit={actions.updateTask}
          onDelete={actions.deleteTask}
        />
      </Project>
    </div>
  );
}

export default ProjectPage;
