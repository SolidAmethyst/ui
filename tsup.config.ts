import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['cjs', 'esm'],
	dts: true,
	splitting: false,
	sourcemap: true,
	clean: true,
	external: ['solid-js'],
	treeshake: true,
	minify: true,
	esbuildOptions(options) {
		options.jsx = 'automatic'
		options.jsxImportSource = 'solid-js'
	}
})
