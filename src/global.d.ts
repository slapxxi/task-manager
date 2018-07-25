import 'react-testing-library';

declare module 'react-testing-library' {
  interface RenderResult {
    baseElement: HTMLHtmlElement;
  }
}

declare global {
  interface Glyph {
    id: string;
    viewBox: string;
    content?: string;
    node?: Node;
  }
}
