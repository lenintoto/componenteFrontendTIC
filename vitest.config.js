import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Asegúrate de que el entorno sea jsdom
    setupFiles: './src/setupTests.js', // Archivo de configuración para pruebas
  },
});
