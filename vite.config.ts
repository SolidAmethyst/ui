import { resolve } from 'path'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig(({ command }) => {
	const isBuild = command === 'build'

	// Dev mode - serve demo app
	if (!isBuild) {
		return {
			plugins: [solid()],
			server: {
				host: true,
				allowedHosts: ['.ngrok-free.app', '.ngrok.io']
			},
			optimizeDeps: {
				include: ['solid-js']
			},
			resolve: {
				alias: {
					'@': resolve(__dirname, './src')
				}
			}
		}
	}

	// Build mode - build library
	return {
		plugins: [solid()],
		build: {
			lib: {
				entry: resolve(__dirname, 'src/index.ts'),
				name: 'SolidUIToolkit',
				formats: ['es', 'cjs'],
				fileName: format => (format === 'es' ? 'index.js' : 'index.cjs')
			},
			rollupOptions: {
				external: ['solid-js'],
				output: {
					globals: {
						'solid-js': 'Solid'
					}
				}
			},
			sourcemap: true,
			outDir: 'dist'
		}
	}
})
