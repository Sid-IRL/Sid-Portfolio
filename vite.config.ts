import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const repoBasePath = '/Sid_Portfolio/'

// Vite equivalent of Next.js basePath/assetPrefix for GitHub Pages.
export default defineConfig({
  base: repoBasePath,
  plugins: [react()],
})
