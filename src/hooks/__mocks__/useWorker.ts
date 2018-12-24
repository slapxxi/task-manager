function mockUseWorker(fn: (action: any) => void) {
  return {
    postMessage: jest.fn((action: any) => {
      fn(action);
    }),
  };
}

export default mockUseWorker;
