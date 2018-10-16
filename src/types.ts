type ID = string;

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
  readonly tags: Array<Tag | UserCreatedTag>;
}

interface DBTask {
  readonly title: string;
  readonly description: string;
  readonly createdAt: number;
  readonly completed: boolean;
  readonly project: ID;
  readonly tags: ID[];
}

interface UserCreatedTask {
  readonly title?: string;
  readonly description?: string;
  readonly tags: UserCreatedTag[];
}

interface Project {
  readonly id: ID;
  readonly name: string;
  readonly tasks: Task[];
}

export {
  DBProject,
  DBTag,
  DBTask,
  ID,
  Project,
  Tag,
  Task,
  UserCreatedTag,
  UserCreatedTask,
};
