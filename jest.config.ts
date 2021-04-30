module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  collectCoverageFrom: [
    'src/pages/SignInPage/SignInPage.tsx',
    'src/pages/ToDoPage/ToDoPage.tsx',
    'src/store/actions.ts',
    'src/store/reducer.ts',
  ],
  coverageThreshold: {
    global: {
      statements: 70,
      branches: 70,
      functions: 70,
      lines: 70,
    },
  },
  coverageDirectory: 'coverage',
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/internals/mocks/cssModule.ts',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/internals/mocks/image.ts',
  },
  // Indicates whether each individual test should be reported during the run
  verbose: false,
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/ts-jest"
  },
  setupFilesAfterEnv: ['<rootDir>src/setupTests.ts'],
  setupFiles: ['raf/polyfill'],
  testRegex: 'tests/.*\\.test\\.ts$',
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
