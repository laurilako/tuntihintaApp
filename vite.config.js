import { defineConfig } from 'vite'
import dotenv from 'dotenv'
import react from '@vitejs/plugin-react'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.PORT} || 3000`,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})
