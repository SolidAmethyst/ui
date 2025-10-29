import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['cjs', 'esm'],
	dts: true,
	splitting: false,
	sourcemap: true,
	clean: true,
	external: ['solid-js'],
	esbuildOptions(options) {
		options.jsx = 'preserve'
	}
})
