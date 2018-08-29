module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupTestFrameworkScriptFile: './src/setupTests.ts',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.html?$': '<rootDir>/htmlTransformer.js',
  },
  moduleNameMapper: {
    '\\.(css|less|svg)$': 'identity-obj-proxy',
  },
};
