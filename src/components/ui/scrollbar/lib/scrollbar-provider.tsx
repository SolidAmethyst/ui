// Scrollbar context provider
// Provides global configuration to all scrollbar components

import {
	createContext,
	createSignal,
	JSX,
	onCleanup,
	onMount,
	useContext
} from 'solid-js'
import { scrollbarConfig, type ScrollbarConfig } from './scrollbar-config'

interface ScrollbarContextValue {
	config: ScrollbarConfig
	setEngineEnabled: (enabled: boolean) => void
	setTheme: (theme: ScrollbarConfig['theme']) => void
	updateConfig: (updates: Partial<ScrollbarConfig>) => void
}

const ScrollbarContext = createContext<ScrollbarContextValue>()

export const ScrollbarProvider = (props: {
	children: JSX.Element
	config?: Partial<ScrollbarConfig>
}) => {
	const [config, setConfig] = createSignal(scrollbarConfig.getConfig())

	// Subscribe to config changes
	onMount(() => {
		const unsubscribe = scrollbarConfig.subscribe(setConfig)

		// Apply initial config if provided
		if (props.config) {
			scrollbarConfig.updateConfig(props.config)
		}

		onCleanup(unsubscribe)
	})

	const contextValue: ScrollbarContextValue = {
		get config() {
			return config()
		},
		setEngineEnabled: (enabled: boolean) => {
			scrollbarConfig.setEngineEnabled(enabled)
		},
		setTheme: (theme: ScrollbarConfig['theme']) => {
			scrollbarConfig.setTheme(theme)
		},
		updateConfig: (updates: Partial<ScrollbarConfig>) => {
			scrollbarConfig.updateConfig(updates)
		}
	}

	return (
		<ScrollbarContext.Provider value={contextValue}>
			{props.children}
		</ScrollbarContext.Provider>
	)
}

export const useScrollbarConfig = () => {
	const context = useContext(ScrollbarContext)
	if (!context) {
		throw new Error('useScrollbarConfig must be used within ScrollbarProvider')
	}
	return context
}
