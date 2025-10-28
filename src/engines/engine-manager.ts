// Engine manager for dynamic loading and fallback
import { mockEngine } from './mock/mock-engine'
import type { EngineConfig, UIEngine } from './types/engine-interface'

// Extended engine interface with DLL methods
interface TauriEngineWithDLL extends UIEngine {
	initPhysicsEngine?(): Promise<void>
	calculateScrollbarPhysics?(...args: any[]): Promise<any>
	getPhysicsEngineInfo?(): Promise<string>
}

export class EngineManager {
	private currentEngine: UIEngine | null = null
	private config: EngineConfig
	private isInitialized = false

	constructor(config: EngineConfig) {
		this.config = config
	}

	async initialize(): Promise<void> {
		if (this.isInitialized) return

		try {
			// Try to load Tauri engine if enabled
			if (this.config.enabled && this.config.autoDetect) {
				const tauriAvailable = await this.detectTauriEngine()
				if (tauriAvailable) {
					this.currentEngine = await this.loadTauriEngine()
				}
			}

			// Fallback to mock engine if no engine loaded
			if (!this.currentEngine) {
				this.currentEngine = mockEngine
			}

			this.isInitialized = true
		} catch (error) {
			console.warn('Failed to initialize engine, falling back to mock:', error)
			this.currentEngine = mockEngine
			this.isInitialized = true
		}
	}

	async getEngine(): Promise<UIEngine> {
		if (!this.isInitialized) {
			await this.initialize()
		}
		return this.currentEngine!
	}

	private async detectTauriEngine(): Promise<boolean> {
		// Check if Tauri is available
		if (typeof window === 'undefined') return false
		if (!window.__TAURI__) return false
		if (typeof window.__TAURI__.invoke !== 'function') return false

		// Try to load Tauri engine module
		try {
			const tauriEngine = await this.loadTauriEngine()
			return await tauriEngine.isAvailable()
		} catch {
			return false
		}
	}

	private async loadTauriEngine(): Promise<UIEngine> {
		try {
			// Dynamic import of Tauri engine with DLL support
			const { tauriEngine } = await import('./tauri/tauri-engine')

			// Initialize physics engine DLL if available
			if (this.config.physicsEnabled) {
				try {
					const engineWithDLL = tauriEngine as TauriEngineWithDLL
					if (engineWithDLL.initPhysicsEngine) {
						await engineWithDLL.initPhysicsEngine()
						console.log('Physics engine DLL initialized successfully')
					}
				} catch (error) {
					console.warn('Failed to initialize physics engine DLL:', error)
				}
			}

			return tauriEngine
		} catch (error) {
			console.warn('Failed to load Tauri engine:', error)
			throw error
		}
	}

	updateConfig(newConfig: Partial<EngineConfig>): void {
		this.config = { ...this.config, ...newConfig }
		// Reinitialize if config changed
		this.isInitialized = false
	}

	getConfig(): EngineConfig {
		return { ...this.config }
	}
}

// Global engine manager instance
let globalEngineManager: EngineManager | null = null

export function getEngineManager(config?: EngineConfig): EngineManager {
	if (!globalEngineManager) {
		globalEngineManager = new EngineManager(
			config || {
				enabled: true,
				autoDetect: true,
				fallbackToJS: true,
				physicsEnabled: true,
				zoomEnabled: true
			}
		)
	}
	return globalEngineManager
}

// Convenience function to get current engine
export async function getCurrentEngine(): Promise<UIEngine> {
	const manager = getEngineManager()
	return await manager.getEngine()
}
