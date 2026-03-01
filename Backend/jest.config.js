module.exports = {
  testEnvironment: 'node',
  verbose: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/config/**',
    '!src/api/routes/**',
    '!src/data/models/**'
  ],
  testMatch: ['**/tests/**/*.test.js'],
  setupFilesAfterEnv: ['./tests/setup.js'],
};
