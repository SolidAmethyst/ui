import solid from 'vite-plugin-solid'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [solid({ ssr: false })],
	test: {
		environment: 'happy-dom',
		globals: true,
		setupFiles: ['./src/test/setup.ts'],
		pool: 'threads',
		mockReset: true,
		clearMocks: true,
		testTimeout: 10000,
		coverage: {
			provider: 'v8'
		},
		server: {
			deps: {
				inline: ['solid-js', '@solidjs/testing-library']
			}
		}
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
		target: 'node18'
	}
})
