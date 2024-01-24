import { compilerOptions } from './tsconfig.json'
import { pathsToModuleNameMapper } from 'ts-jest/utils'

export default {
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    './src/**/*.{ts,tsx,js,jsx}',
    '!./src/infra/database/typeorm/migration/*',
    '!./src/domain/dto/*',
    '!./src/routes/*',
    '!**/node_modules/**',
    '!**/dist/**',
  ],
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
}
