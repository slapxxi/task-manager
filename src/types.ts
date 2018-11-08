import { Color } from 'csstype';

type Percentage = number;

type EpochTime = number;

type ID = string;

type Size = number | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

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

interface DBProject {
  readonly name: string;
  readonly tasks: ID[];
}

interface Tag {
  readonly id: ID;
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
  readonly description: string;
  readonly createdAt: number;
  readonly completed: boolean;
  readonly project: ID;
  readonly subtasks: Subtask[];
  readonly deadline?: Date;
  readonly tags: Array<Tag | UserCreatedTag>;
}

interface DBTask {
  readonly title: string;
  readonly description: string;
  readonly createdAt: number;
  readonly completed: boolean;
  readonly project: ID;
  readonly subtasks: Subtask[];
  readonly deadline: EpochTime;
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

interface StoreState {
  tasks: Task[];
  tags: Tag[];
  projects: Project[];
}

interface InnerStore extends StoreState {
  actions: {
    updateTask: (task: Task) => void;
    updateProject: (project: Project) => void;
    deleteTask: (task: Task) => void;
  };
}

export {
  Action,
  ColorTheme,
  DBEntry,
  DBProject,
  DBTag,
  DBTask,
  EpochTime,
  Glyph,
  ID,
  InnerStore,
  Percentage,
  Project,
  Size,
  StoreState,
  Subtask,
  Tag,
  Task,
  UserCreatedSubtask,
  UserCreatedTag,
  UserCreatedTask,
};
