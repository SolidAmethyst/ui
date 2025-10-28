import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    transformMode: {
      web: [/\.[jt]sx?$/],
    },
    pool: "forks",
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": "./src",
    },
  },
  define: {
    "import.meta.vitest": "undefined",
  },
  esbuild: {
    target: "node14",
  },
});
