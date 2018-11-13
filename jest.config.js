module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupTestFrameworkScriptFile: './src/setupTests.ts',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.html?$': '<rootDir>/htmlTransformer.js',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es)'],
  moduleNameMapper: {
    '\\.(css|less|svg)$': 'identity-obj-proxy',
    '^@local/(.*)$': '<rootDir>/src/$1',
    '^@lib$': '<rootDir>/src/lib/',
    '^@lib/(.*)$': '<rootDir>/src/lib/$1',
  },
  globals: {
    'ts-jest': {
      diagnostics: { pathRegex: '\\.(spec|test)\\.(ts|tsx)' },
    },
  },
};
