import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes("-"),
        },
      },
    }),
  ],
  build: {
    manifest: true,
    rollupOptions: {
      input: ["./src/main.ts", "./index.html", "./index.fr.html"],
    },
  },
});
