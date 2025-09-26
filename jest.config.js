module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'js', 'json', 'html'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-|@ngrx|@angular|rxjs|tslib))',
  ],
  // setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'text'],
  collectCoverageFrom: [
    'src/app/**/*.ts',
    '!src/**/*.d.ts',
    '!src/main.ts',
    '!src/environments/**',
    '!src/app/app-routing.module.ts',
  ],
};
