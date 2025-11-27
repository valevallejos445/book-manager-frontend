// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://book-manager-backend-hg8h.onrender.com',
        changeOrigin: true,
        secure: false,
        // Esto asegura que las peticiones a `/api/...` se redirijan al backend
      },
    },
  },
});