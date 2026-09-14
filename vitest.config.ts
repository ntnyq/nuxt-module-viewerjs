import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '#app': fileURLToPath(
        new URL('./node_modules/nuxt/dist/app/index.js', import.meta.url),
      ),
    },
  },
  test: {
    environment: 'happy-dom',
    include: ['tests/**/*.test.ts'],
  },
})
