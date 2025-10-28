import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./src/test/setup.ts'],
		pool: 'forks',
		mockReset: true,
		clearMocks: true,
		testTimeout: 10000
	},
	resolve: {
		alias: {
			'@': './src'
		}
	},
	define: {
		'import.meta.vitest': 'undefined'
	},
	esbuild: {
		target: 'node14'
	}
})
