import { Color } from 'csstype';
import 'react-testing-library';

declare global {
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
