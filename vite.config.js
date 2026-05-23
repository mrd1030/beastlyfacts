import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  logLevel: 'error',        // Suppress warnings, only show errors
  plugins: [react()],
  server: {
    middlewareMode: false,
    historyApiFallback: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
})
