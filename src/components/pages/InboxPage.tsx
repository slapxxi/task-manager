import { TasksEditor } from '@local/components';
import { useStore } from '@local/hooks';
import * as React from 'react';

function InboxPage() {
  const { tasks, actions } = useStore();
  return (
    <div>
      <TasksEditor
        tasks={tasks}
        onEdit={actions.updateTask}
        onDelete={actions.deleteTask}
        onCreate={actions.updateTask}
      />
    </div>
  );
}

export default InboxPage;
