import { Color } from 'csstype';
import 'react-testing-library';

declare global {
  type ID = string;

  type Size = number | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

  interface Tag {
    readonly id?: string;
    readonly name: string;
  }

  interface StoreState {
    tasks: Task[];
    tags: Tag[];
  }

  interface InnerStore extends StoreState {
    updateTask?: (task: Task) => void;
    deleteTask?: (task: Task) => void;
  }

  interface APIResponse {
    tasks: {
      [id: string]: {
        title: string;
        tags: ID[];
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
    [index: string]: any;
  }

  interface Task {
    readonly id: ID;
    readonly title: string | null;
    readonly tags: Tag[];
    readonly description: string | null;
    readonly completed: boolean;
    readonly createdAt: number;
  }

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
}
