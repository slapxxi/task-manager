import { set } from 'lodash';

Date.now = () => 69;

let databaseMock = {
  tasks: {
    'first-task': {
      title: 'first',
      deadline: 0,
      createdAt: 1,
    },
    'second-task': {
      title: 'second',
      deadline: 2668,
      createdAt: 2,
    },
    'third-task': {
      title: 'third',
      tags: ['html'],
      deadline: 0,
      project: 'test',
    },
  },
  tags: {
    html: {
      name: 'HTML',
    },
    css: {
      name: 'CSS',
    },
  },
  projects: {
    test: {
      name: 'Test Project',
    },
  },
};

const snapshot = {
  val() {
    return databaseMock;
  },
  tasks: {
    val() {
      return databaseMock.tasks;
    },
  },
  tags: {
    val() {
      return databaseMock.tags;
    },
  },
};

const mock = {
  __reset() {
    databaseMock = {
      tasks: {
        'first-task': {
          title: 'first',
          deadline: 0,
          createdAt: 1,
        },
        'second-task': {
          title: 'second',
          deadline: 2668,
          createdAt: 2,
        },
        'third-task': {
          title: 'third',
          tags: ['html'],
          deadline: 0,
          project: 'test',
        },
      },
      tags: {
        html: {
          name: 'HTML',
        },
        css: {
          name: 'CSS',
        },
      },
      projects: {
        test: {
          name: 'Test Project',
        },
      },
    };
  },
  database() {
    return {
      ref(path: string) {
        if (path === '/') {
          return {
            on(event, fn) {
              fn(snapshot);
              const interval = setInterval(() => {
                fn(snapshot);
              }, 1);
              return interval;
            },
            off(event, fn) {
              clearInterval(fn);
            },
          };
        }
        return {
          on(event, fn) {
            fn(snapshot.tasks);
            setInterval(() => {
              fn(snapshot.tasks);
            }, 1);
          },
          once(event) {
            return new Promise((resolve) => resolve(snapshot));
          },
          set(value) {
            const objectPath = path.replace(/\//g, '.').slice(1);
            set(databaseMock, objectPath, value);
          },
        };
      },
    };
  },
};

export default mock;
