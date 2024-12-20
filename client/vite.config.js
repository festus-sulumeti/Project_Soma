import path from "node:path"; // Ensure Node.js "path" module is explicitly used
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Adjusted to be consistent
    },
  },
  build: {
    sourcemap: false, // Disable sourcemaps if they're causing errors
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0];
          }
        },
      },
    },
  },
});
