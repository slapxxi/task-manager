import { Store, Task, Tasks } from '@local/components';
import * as React from 'react';

function InboxPage() {
  return (
    <Store>
      {({ tasks, actions }) => (
        <div>
          <Tasks
            tasks={tasks}
            onCreate={actions.updateTask}
            renderTask={({ task, expand, onExpand }) => (
              <Task
                task={task}
                onEdit={actions.updateTask}
                onDelete={actions.deleteTask}
                expand={expand}
                onExpand={onExpand}
              />
            )}
          />
        </div>
      )}
    </Store>
  );
}

export default InboxPage;
