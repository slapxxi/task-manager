import { Color } from 'csstype';
import 'react-testing-library';

declare global {
  interface APIResponse {
    tasks: {
      [id: string]: {
        id?: string;
        title?: string;
        description?: string;
        createdAt?: number;
        completed?: boolean;
      };
    };
    [index: string]: any;
  }

  interface Task {
    readonly id: string;
    readonly title: string | null;
    readonly description: string | null;
    readonly completed: boolean;
    readonly createdAt: number;
  }

  interface Glyph {
    id: string;
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

  type Size = number | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
}
