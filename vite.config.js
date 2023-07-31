import path from "path";
import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig({
	plugins: [preact()],
	resolve: {
    alias: {
			"@": path.resolve(__dirname, "./src"),
      "@atomic": path.resolve(__dirname, "./src/components/atomic"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@pages": path.resolve(__dirname, "./src/pages"),
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:8000"
    }
  }
});