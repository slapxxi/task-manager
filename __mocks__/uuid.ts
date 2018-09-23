const uuidMock = {
  counter: 0,
  __reset() {
    this.counter = 0;
  },
  v4() {
    const id = `unique-id-${this.counter}`;
    this.counter += 1;
    return id;
  },
};

export default uuidMock;
