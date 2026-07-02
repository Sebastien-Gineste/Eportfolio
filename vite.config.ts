import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// The `base` path must match how the site is served on GitHub Pages.
//   - User/Org site (repo named `username.github.io`): base = '/'
//   - Project site (any other repo name):               base = '/<repo-name>/'
// Override it without touching this file by setting the BASE_PATH env var, e.g.:
//   BASE_PATH=/my-repo/ npm run build
// See the README ("GitHub Pages" section) for details.
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
  },
});
