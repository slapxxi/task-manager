import 'react-testing-library';

declare module 'react-testing-library' {
  interface RenderResult {
    baseElement: HTMLHtmlElement;
  }
}
