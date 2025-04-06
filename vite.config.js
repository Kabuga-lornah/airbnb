import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      '@mui/x-date-pickers',
      '@mui/x-date-pickers/AdapterDateFns',
      '@mui/x-date-pickers/LocalizationProvider',
      'date-fns',
      'date-fns/locale'
    ],
    exclude: ['js-big-decimal']
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    }
  }
});