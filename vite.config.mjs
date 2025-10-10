import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['dashboard-h2rx.onrender.com']
  },
  server: {
    host: true
  }
})

