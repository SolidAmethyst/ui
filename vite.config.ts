import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import solid from 'vite-plugin-solid'

export default defineConfig({
	plugins: [solid(), dts({ rollupTypes: true })],
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
})
