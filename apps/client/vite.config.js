import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      "/api": {
        target: process.env?.VITE_API_URL || "http://localhost:8080",
        changeOrigin: true,
        // Do not rewrite; keep /api so backend route prefix matches
      },
      "/health": {
        target: process.env?.VITE_API_URL || "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});
