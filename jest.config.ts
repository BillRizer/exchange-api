export default {
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',

  collectCoverageFrom: [
    './src/**/*.{ts,tsx,js,jsx}',
    '!**/node_modules/**',
    '!**/dist/**',
  ],

  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],

  preset: 'ts-jest',

  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
}
