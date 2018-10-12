interface Task {
  readonly id: ID;
  readonly title: string | null;
  readonly tags: Tag[];
  readonly project: ID | null;
  readonly description: string | null;
  readonly completed: boolean;
  readonly createdAt: number;
}

interface Project {
  id: ID;
  name: string;
  tasks: Task[];
}

export { Project, Task };
