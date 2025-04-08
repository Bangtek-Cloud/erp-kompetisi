import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/image': {
        target: 'http://103.187.146.79:9100',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/image/, '')
      },
    }
  },
  preview: {
    port: 8080,
    host: true,
    allowedHosts: true,
    proxy: {
      '/image': {
        target: 'http://103.187.146.79:9100',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/image/, '')
      },
    }
  },
})
