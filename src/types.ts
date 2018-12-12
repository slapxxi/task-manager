import { Color } from 'csstype';

type Percentage = number;

type EpochTime = number;

type ID = string;

type Size = number | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

interface Database {
  tags: StoreEntry<StoreTag>;
  tasks: StoreEntry<StoreTask>;
  projects: StoreEntry<StoreProject>;
}

interface DatabaseResponse {
  readonly tags?: DBEntry<DBTag>;
  readonly tasks?: DBEntry<DBTask>;
  readonly projects?: DBEntry<DBProject>;
}

interface Action<T> {
  type: T;
  payload?: any;
}

interface ColorTheme {
  primaryColor?: Color;
  secondaryColor?: Color;
  tertiaryColor?: Color;
  [index: number]: Color;
}

interface DBEntry<T> {
  [id: string]: T;
}

interface StoreEntry<T> {
  [id: string]: T;
}

interface Tag {
  readonly id: ID;
  readonly name: string;
}

interface StoreTag {
  readonly name: string;
}

interface DBTag {
  readonly name: string;
}

interface UserCreatedTag {
  readonly name: string;
}

interface Task {
  readonly id: ID;
  readonly title: string;
  readonly description?: string;
  readonly createdAt: Date;
  readonly completed: boolean;
  readonly project?: ID;
  readonly subtasks: Subtask[];
  readonly deadline?: Date;
  readonly tags: Tag[];
}

interface StoreTask {
  readonly title: string;
  readonly description: string | null;
  readonly createdAt: EpochTime;
  readonly completed: boolean;
  readonly project: ID | null;
  readonly subtasks: Subtask[];
  readonly deadline: EpochTime | null;
  readonly tags: ID[];
}

interface DBTask {
  readonly title: string;
  readonly description?: string;
  readonly createdAt: EpochTime;
  readonly completed: boolean;
  readonly project?: ID;
  readonly subtasks: Subtask[];
  readonly deadline?: EpochTime;
  readonly tags: ID[];
}

interface UserCreatedTask {
  readonly title?: string;
  readonly description?: string;
  readonly tags: UserCreatedTag[];
}

interface Subtask {
  id: ID;
  description: string;
  completed: boolean;
}

interface UserCreatedSubtask {
  description: string;
  completed: boolean;
}

interface Project {
  readonly id: ID;
  readonly name: string;
  readonly tasks: Task[];
}

interface DBProject {
  readonly name: string;
}

interface StoreProject {
  readonly name: string;
}

export {
  Action,
  ColorTheme,
  Database,
  DatabaseResponse,
  DBEntry,
  DBProject,
  DBTag,
  DBTask,
  EpochTime,
  Glyph,
  ID,
  Percentage,
  Project,
  Size,
  StoreEntry,
  StoreProject,
  StoreTag,
  StoreTask,
  Subtask,
  Tag,
  Task,
  UserCreatedSubtask,
  UserCreatedTag,
  UserCreatedTask,
};
