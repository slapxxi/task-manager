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
  const { getProjects, actions } = useStore();
  const project = getProjects().filter((p) => p.id === projectID)[0];

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
      <div className={styles.toolbar}>
        <div>
          Home <IconSystem name="arrow-right" size={10} /> Projects{' '}
          <IconSystem name="arrow-right" size={10} /> <strong>Blackout</strong>
        </div>
        <div>
          Order <IconSystem name="arrow-down" size={10} />
        </div>
        <div>
          Filter <IconSystem name="arrow-down" size={10} />
        </div>
      </div>
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
      <div className={styles.subtitle}>{project.tasks.length} Tasks</div>
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
