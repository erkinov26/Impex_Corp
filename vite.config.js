import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@layout": path.resolve(__dirname, "./src/layout"),
      "@ui": path.resolve(__dirname, "./src/ui"),
      "@styles": path.resolve(__dirname, "./src/assets/styles"),
      "@images": path.resolve(__dirname, "./src/assets/img"),
      "@store": path.resolve(__dirname, "./src/store"),
    },
  },
})
