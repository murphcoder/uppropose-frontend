import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'ef52fe5cddc8.ngrok-free.app'
    ],
    host: true,   // optional, makes Vite listen on all addresses
    port: 5173    // or whatever port you use
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
