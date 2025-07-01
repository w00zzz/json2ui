// vite.config.ts o vitest.config.ts
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'), // ajusta aquí a la raíz donde está tu backend
    },
  },
  test: {
    globals: true,
    environment: 'node',
  },
});
