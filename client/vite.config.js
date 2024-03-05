import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      // Proxying API requests to the backend server
      "/graphql": {
        target: "http://localhost:3001", // Replace with the URL of your backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
