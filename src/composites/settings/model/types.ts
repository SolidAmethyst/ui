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
export type AppearanceSubcategory = 'glass' | 'theme'

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
