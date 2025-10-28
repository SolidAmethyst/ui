import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import solid from "eslint-plugin-solid";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // Browser APIs
        window: "readonly",
        document: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        // DOM types
        HTMLElement: "readonly",
        HTMLDivElement: "readonly",
        MouseEvent: "readonly",
        WheelEvent: "readonly",
        Event: "readonly",
        // Observers
        ResizeObserver: "readonly",
        MutationObserver: "readonly",
        // Other
        getComputedStyle: "readonly",
        NodeJS: "readonly",
        global: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
      solid: solid,
    },
    rules: {
      ...typescript.configs.recommended.rules,
      ...solid.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "solid/reactivity": "warn",
      "solid/no-destructure": "warn",
      "solid/no-innerhtml": "warn",
      "solid/style-prop": "warn",
      "no-undef": "off", // TypeScript handles this
    },
  },
  {
    files: [
      "**/*.test.{ts,tsx}",
      "**/__tests__/**/*.{ts,tsx}",
      "**/test/**/*.{ts,tsx}",
    ],
    languageOptions: {
      globals: {
        // Test globals
        expect: "readonly",
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        vi: "readonly",
        // Browser APIs
        window: "readonly",
        document: "readonly",
        global: "readonly",
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "solid/reactivity": "off",
      "solid/no-destructure": "off",
      "solid/no-innerhtml": "off",
      "solid/style-prop": "off",
    },
  },
];
