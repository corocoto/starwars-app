import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve('src/'),
      public: path.resolve('public/')
    },
  },
  // base: '/starwars-app/' // Turn off, if you want to run locally
});
