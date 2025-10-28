import '@testing-library/jest-dom'

// Polyfills for Node.js environment
import { TextDecoder, TextEncoder } from 'util'

// Set up global polyfills
Object.defineProperty(global, 'TextEncoder', {
	writable: true,
	value: TextEncoder
})

Object.defineProperty(global, 'TextDecoder', {
	writable: true,
	value: TextDecoder
})

// Mock URL constructor
Object.defineProperty(global, 'URL', {
	writable: true,
	value: class URL {
		constructor(url: string, _base?: string) {
			this.href = url
			this.origin = ''
			this.protocol = ''
			this.host = ''
			this.hostname = ''
			this.port = ''
			this.pathname = ''
			this.search = ''
			this.hash = ''
		}
		href: string
		origin: string
		protocol: string
		host: string
		hostname: string
		port: string
		pathname: string
		search: string
		hash: string
	}
})

// Mock URLSearchParams
Object.defineProperty(global, 'URLSearchParams', {
	writable: true,
	value: class URLSearchParams {
		constructor(init?: string | string[][] | Record<string, string>) {
			this.params = new Map()
			if (init) {
				if (typeof init === 'string') {
					init.split('&').forEach(pair => {
						const [key, value] = pair.split('=')
						if (key) this.params.set(key, value || '')
					})
				}
			}
		}
		private params: Map<string, string>
		get(name: string) {
			return this.params.get(name) || null
		}
		set(name: string, value: string) {
			this.params.set(name, value)
		}
		has(name: string) {
			return this.params.has(name)
		}
		delete(name: string) {
			this.params.delete(name)
		}
		toString() {
			return Array.from(this.params.entries())
				.map(([key, value]) => `${key}=${value}`)
				.join('&')
		}
	}
})
