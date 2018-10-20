import { assignToProject } from '@lib';
import { Project, Store, Task, Tasks } from '@local/components';
import { ID } from '@local/types';
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
            renderProject={({ project }) => (
              <Tasks
                tasks={project.tasks}
                onCreate={(t) =>
                  actions.updateTask(assignToProject(t, project))
                }
                renderTask={({ task, expand, onExpand }) => (
                  <Task
                    task={task}
                    expand={expand}
                    onExpand={onExpand}
                    onEdit={actions.updateTask}
                    onDelete={actions.deleteTask}
                  />
                )}
              />
            )}
          />
        )}
      </Store>
    </div>
  );
}

export default ProjectPage;
