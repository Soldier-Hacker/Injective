import { defineConfig } from "vite";
import { nodePolyfills } from "@bangjelkoski/vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [nodePolyfills({ protocolImports: true })],
  build: {
	  target: 'es2020',
  }
});
