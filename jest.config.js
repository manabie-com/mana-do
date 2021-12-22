
module.exports = {
    roots: ["<rootDir>"],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?(x)',
    moduleFileExtensions: ['ts', 'js', 'json', 'node', 'tsx'],
    collectCoverage: false,
    clearMocks: true,
    coverageDirectory: "coverage",
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts']
}