import { assignToProject, getProjectProgress } from '@lib';
import { TasksEditor } from '@local/components';
import Button from '@local/components/Button/Button';
import IconSystem from '@local/components/IconSystem/IconSystem';
import ProgressCheckbox from '@local/components/ProgressCheckbox/ProgressCheckbox';
import TextArea from '@local/components/TextArea/TextArea';
import { useStore } from '@local/hooks';
import { ID } from '@local/types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import styles from './styles.css';

interface Props {
  projectID: ID;
}

function ProjectPage({ projectID }: Props) {
  const animateProgress = true;
  const { projects, actions } = useStore();
  const project = projects.filter((p) => p.id === projectID)[0];

  if (project === undefined) {
    return <Redirect to="/" />;
  }

  function handleChange(value: string) {
    actions.updateProject({ ...project, name: value });
  }

  function handleDelete() {
    actions.deleteProject(project);
  }

  return (
    <div className={styles.projectPage}>
      <header className={styles.header}>
        <ProgressCheckbox
          size={22}
          progress={getProjectProgress(project)}
          animate={animateProgress}
        />
        <TextArea
          className={styles.editableTitle}
          placeholder="Project Name..."
          value={project.name}
          onChange={handleChange}
          data-testid="project-name"
        />
        <Button className={styles.menu} onClick={handleDelete}>
          <IconSystem name="dots" size={22} />
        </Button>
      </header>
      <div className={styles.subtitle}>{project.tasks.length} tasks</div>
      <div className={styles.content}>
        <TasksEditor
          tasks={project.tasks}
          onCreate={(t) => actions.updateTask(assignToProject(t, project))}
          onEdit={actions.updateTask}
          onDelete={actions.deleteTask}
        />
      </div>
    </div>
  );
}

export default ProjectPage;
