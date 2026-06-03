import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    testTimeout: 30000,
    setupFiles: ['./test/vitest.setup.js'],
    include: ['test/**/*.test.js'],
    exclude: ['**/node_modules/**', '**/tests/fixtures/**'],
    coverage: {
      enabled: true,
      include: ['src/**'],
      exclude: ['**/tests/fixtures/**']
    }
  }
})
