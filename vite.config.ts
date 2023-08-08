import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import path from "path";

export default defineConfig({
	plugins: [preact()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@stores": path.resolve(__dirname, "./src/stores"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    }
  },
  server: {
    proxy: {
      "/api": "http://localhost:8000",
    }
  }
});
