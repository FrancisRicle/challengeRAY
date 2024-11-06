import { fileURLToPath, URL } from "node:url";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      services: fileURLToPath(new URL("./src/services", import.meta.url)),
      components: fileURLToPath(new URL("./src/components", import.meta.url)),
      hooks: fileURLToPath(new URL("./src/hooks", import.meta.url)),
    },
  },
})
