import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    pool: "forks",
    mockReset: true,
    clearMocks: true,
    testTimeout: 10000,
    coverage: {
      provider: "c8",
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
    target: "node18",
  },
});
