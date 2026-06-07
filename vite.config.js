import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// NOTE: Change 'base' to your GitHub repo name for GitHub Pages deployment
// e.g., if your repo is github.com/johndoe/my-portfolio → base: '/my-portfolio/'
// For custom domain, set base: '/'
export default defineConfig({
  plugins: [react()],
  base: '/portfolio/', // <-- change this to your repo name
})
