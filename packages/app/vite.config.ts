import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";
import { ViteImageOptimizer as imageOptimizer } from "vite-plugin-image-optimizer";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [
    tsconfigPaths(),
    react({ jsxImportSource: "@emotion/react" }),
    visualizer(),
    imageOptimizer(),
  ],

  test: {
    setupFiles: ["./vitest.setup.ts"],
    environment: "jsdom",
  },
}));
