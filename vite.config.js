import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base:"./",
  plugins: [vue({ compilerOptions: {
    customElement: true,
  },})],
  build: {
    manifest: true,
    rollupOptions: {
      input: ['./src/main.js'],
    },
  },
  server: {
    port: '8080'
  }

})