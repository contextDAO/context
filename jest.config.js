/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 30000,
  globalSetup: './tests/globalSetup.ts',
  globalTeardown: './tests/globalTeardown.ts'
};
