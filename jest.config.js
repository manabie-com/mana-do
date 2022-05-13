module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  resetMocks: false,
  setupFiles: ["jest-localstorage-mock"],
  testEnvironmentOptions: { url: 'http://localhost/' },
  // globals: {
  //   window: {},
  // }
};
