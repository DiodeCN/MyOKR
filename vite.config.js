import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, process.env.VITE_HTTPS_KEY)),
      cert: fs.readFileSync(path.resolve(__dirname, process.env.VITE_HTTPS_CERT)),
    },
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      input: './main.html'
    }
  }
});
