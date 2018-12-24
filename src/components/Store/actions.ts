import { Database, Project, Task } from '@local/types';

enum ActionType {
  completeSync = 'COMPLETE_SYNC',
  deleteProject = 'DELETE_PROJECT',
  deleteTask = 'DELETE_TASK',
  receiveData = 'RECEIVE_DATA',
  requestData = 'REQUEST_DATA',
  startSync = 'START_SYNC',
  syncDatabase = 'SYNC_DATABASE',
  updateProject = 'UPDATE_PROJECT',
  updateTask = 'UPDATE_TASK',
}

type StoreAction =
  | { type: ActionType.startSync }
  | { type: ActionType.completeSync }
  | { type: ActionType.requestData }
  | { type: ActionType.receiveData; payload: Database }
  | { type: ActionType.updateTask; payload: Task }
  | { type: ActionType.deleteTask; payload: Task }
  | { type: ActionType.updateProject; payload: Project }
  | { type: ActionType.deleteProject; payload: Project };

export { ActionType, StoreAction };
