import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ command }) => ({
  // Project-pages subpath for production builds; root for `vite dev` / `vite preview`.
  base: command === 'build' ? '/mathdoku-online-calculator/' : '/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test-setup.ts'
  }
}));
