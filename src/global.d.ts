import { ID } from '@local/types';
import 'react-testing-library';

declare global {
  interface Glyph {
    id: ID;
    viewBox: string;
    content?: string;
    node?: Node;
  }
}
