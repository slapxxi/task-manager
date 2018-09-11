const databaseResponse = {
  tasks: {
    testTask: {
      title: '',
    },
    validTask: {
      title: 'Valid',
      description: 'Task description',
      completed: true,
    },
    firstTask: {
      createdAt: 1,
    },
    secondTask: {
      createdAt: 2,
    },
  },
};

const snapshot = {
  val() {
    return databaseResponse.tasks;
  },
};

const firebaseMock = {
  database() {
    return {
      ref() {
        return {
          on(event, fn) {
            fn(snapshot);
          },
        };
      },
    };
  },
};

export default firebaseMock;
