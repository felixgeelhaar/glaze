import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  optimizeDeps: {
    include: ['@glaze/components', '@glaze/react', '@glaze/vue'],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
});