import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, '**/build/**'],
    fileParallelism: false, // Because of using 1 temp database
  },
})
