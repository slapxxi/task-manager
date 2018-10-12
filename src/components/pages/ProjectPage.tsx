import { Project, Store } from '@local/components';
import * as React from 'react';

interface Props {
  projectID: ID;
}

function ProjectPage({ projectID }: Props) {
  return (
    <div>
      <Store>
        {({ projects, actions }) => (
          <Project
            project={projects.filter((p) => p.id === projectID)[0]}
            onEdit={actions.updateProject}
            onEditTask={actions.updateTask}
            onDeleteTask={actions.deleteTask}
          />
        )}
      </Store>
    </div>
  );
}

export default ProjectPage;
