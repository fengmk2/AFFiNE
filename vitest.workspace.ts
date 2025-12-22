import { defineConfig } from '@voidzero-dev/vite-plus';

export default defineConfig({
  test: {
    projects: [
      '.',
      './packages/frontend/apps/electron',
      './blocksuite/**/*/vitest.config.ts',
    ],
  },
});
