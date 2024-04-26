module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
    },
  },
};
