export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',

  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],

  preset: 'ts-jest',

  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
}
