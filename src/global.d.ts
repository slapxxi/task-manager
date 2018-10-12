import { Task } from '@local/types';
import { Color } from 'csstype';
import 'react-testing-library';

declare global {
  type ID = string;

  type Size = number | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

  interface Glyph {
    id: ID;
    viewBox: string;
    content?: string;
    node?: Node;
  }

  interface ColorTheme {
    primaryColor?: Color;
    secondaryColor?: Color;
    tertiaryColor?: Color;
    [index: number]: Color;
  }

  interface Tag {
    readonly id?: string;
    readonly name: string;
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

  interface APIResponse {
    tasks: {
      [id: string]: {
        title: string;
        tags: ID[];
        project: ID | null;
        description: string;
        createdAt: number;
        completed: boolean;
      };
    };
    tags: {
      [id: string]: {
        name: string;
      };
    };
    projects: {
      [id: string]: {
        name: string;
      };
    };
  }

  interface DBProject {
    id: ID;
    name: string;
  }

  // Various entities can refer to a project ID to be grouped under its
  // umbrella.
  interface Project {
    id: ID;
    name: string;
    tasks: Task[];
  }
}
