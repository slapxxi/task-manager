declare module '*.svg' {
  const content: Glyph;
  export default content;
}

declare module '*.html' {
  const content: string;
  export default content;
}

declare module '*.worker.ts' {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}
