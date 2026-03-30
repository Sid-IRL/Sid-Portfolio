import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const repoBasePath = '/Sid-Portfolio/'

// Vite equivalent of Next.js basePath/assetPrefix for GitHub Pages.
export default defineConfig({
  base: repoBasePath,
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
