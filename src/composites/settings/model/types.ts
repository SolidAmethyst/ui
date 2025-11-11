/**
 * Settings Component Types
 * Universal settings panel component
 */

import type { JSX } from 'solid-js'

/**
 * Main category types
 */
export type MainCategory = 'appearance' | 'fonts'

/**
 * Appearance subcategory types
 */
export type AppearanceSubcategory = 'glass' | 'theme' | 'highlights'

/**
 * Glass effect settings
 */
export interface GlassSettings {
	enabled: boolean
	blur: number
	opacity: number
	darkness: number
	saturation: number
}

/**
 * Syntax highlighting color profile
 */
export type HighlightProfile =
	| 'default'
	| 'monokai'
	| 'dracula'
	| 'github'
	| 'vs-code'
	| 'one-dark'

/**
 * Highlights settings
 */
export interface HighlightsSettings {
	profile: HighlightProfile
}

export interface SettingsProps {
	/**
	 * Whether the settings panel is open
	 */
	isOpen: boolean

	/**
	 * Callback when panel should be closed
	 */
	onClose: () => void

	/**
	 * Whether dark theme is active
	 */
	isDark?: boolean

	/**
	 * Panel width (default: 320px)
	 */
	width?: string

	/**
	 * Panel title
	 */
	title?: string

	/**
	 * Additional CSS class names
	 */
	class?: string

	/**
	 * Settings sections/content
	 */
	children?: JSX.Element

	/**
	 * Inline CSS styles
	 */
	style?: JSX.CSSProperties
}

export interface SettingsCompositeProps {
	/**
	 * Whether the settings panel is open
	 */
	isOpen: boolean

	/**
	 * Callback when panel should be closed
	 */
	onClose: () => void

	/**
	 * Whether dark theme is active
	 */
	isDark: () => boolean

	/**
	 * Callback when theme changes
	 */
	onThemeChange?: (isDark: boolean) => void

	/**
	 * Glass effect settings
	 */
	glassSettings: GlassSettings

	/**
	 * Callback when glass settings change
	 */
	onGlassSettingsChange: (settings: GlassSettings) => void

	/**
	 * Highlights settings
	 */
	highlightsSettings?: HighlightsSettings

	/**
	 * Callback when highlights settings change
	 */
	onHighlightsSettingsChange?: (settings: HighlightsSettings) => void

	/**
	 * Additional CSS class names
	 */
	class?: string

	/**
	 * Inline CSS styles
	 */
	style?: JSX.CSSProperties
}
