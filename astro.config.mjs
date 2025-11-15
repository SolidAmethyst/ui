import solid from '@astrojs/solid-js'
import { defineConfig } from 'astro/config'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// Vite plugin to disable host checking for preview
const allowAllHostsPlugin = () => ({
	name: 'allow-all-hosts',
	configurePreviewServer(server) {
		// Add middleware before host check to bypass it
		server.middlewares.use((req, res, next) => {
			// Remove host header restrictions
			if (req.headers.host) {
				// Allow all hosts
				req.headers['x-forwarded-host'] = req.headers.host
			}
			next()
		})
		// Try to remove or override the host check middleware
		const stack = server.middlewares.stack || []
		for (let i = stack.length - 1; i >= 0; i--) {
			const layer = stack[i]
			if (layer && layer.handle && (
				layer.handle.toString().includes('allowedHosts') ||
				layer.handle.toString().includes('Blocked request')
			)) {
				stack.splice(i, 1)
			}
		}
	}
})

// https://astro.build/config
export default defineConfig({
	integrations: [
		solid({
			// Enable client-side hydration
			include: ['**/demo/**/*.{tsx,jsx}', '**/components/**/*.{tsx,jsx}'],
			// Ensure Solid.js JSX is used, not React
			ssr: true
		})
		// Tailwind v4 uses PostCSS directly, not Astro integration
	],
	// Astro server settings
	server: {
		host: true,
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	},
	vite: {
		plugins: [allowAllHostsPlugin()],
		resolve: {
			alias: {
				'@': resolve(__dirname, './src'),
				'react': 'solid-js',
				'react-dom': 'solid-js/web'
			},
			conditions: ['solid', 'browser']
		},
		server: {
			host: true,
			allowedHosts: ['.ngrok-free.app', '.ngrok.io']
		},
		preview: {
			host: true,
			allowedHosts: true
		},
		ssr: {
			noExternal: ['solid-js', '@sapphiresolid/ui']
		},
		optimizeDeps: {
			include: ['solid-js'],
			extensions: ['.jsx', '.tsx']
		},
		build: {
			sourcemap: true,
			minify: false
		}
	},
	output: 'static',
	build: {
		assets: 'assets',
		inlineStylesheets: 'never'
	},
	// Include demo pages in build
	srcDir: './src',
	publicDir: './public'
})
