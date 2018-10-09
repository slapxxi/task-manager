import { Store, Tasks } from '@local/components';
import * as React from 'react';

function InboxPage() {
  return (
    <Store>
      {({ tasks, actions }) => (
        <div>
          <Tasks
            tasks={tasks}
            onChange={actions.updateTask}
            onDelete={actions.deleteTask}
          />
        </div>
      )}
    </Store>
  );
}

export default InboxPage;
