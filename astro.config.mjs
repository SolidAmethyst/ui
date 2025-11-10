import solid from '@astrojs/solid-js'
import { defineConfig } from 'astro/config'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// https://astro.build/config
export default defineConfig({
	integrations: [
		solid({
			// Enable client-side hydration
			include: ['**/demo/**/*.{tsx,jsx}']
		})
		// Tailwind v4 uses PostCSS directly, not Astro integration
	],
	vite: {
		resolve: {
			alias: {
				'@': resolve(__dirname, './src')
			}
		},
		ssr: {
			noExternal: ['solid-js', '@sapphiresolid/ui']
		},
		optimizeDeps: {
			include: ['solid-js']
		}
	},
	output: 'static',
	build: {
		assets: 'assets'
	},
	// Include demo pages in build
	srcDir: './src',
	publicDir: './public'
})
